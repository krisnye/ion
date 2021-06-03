import Assembly from "../ast/Assembly";
import { traverse, skip } from "../Traversal";
import Analysis from "../ast/Analysis";
import Expression from "../ast/Expression";
import Literal from "../ast/Literal";
import * as ast from "../ast";
import { Node } from "../ast";
import createScopeMaps, { ScopeMap, ScopeMaps } from "../createScopeMaps";
import getSortedTypedNodes, { getAncestorDeclaration, getPredecessors } from "../analysis/getSortedTypedNodes";
import evaluate from "./evaluate";
import { getAbsoluteName, SemanticError, getLast, getLastIndex } from "../common";
import toCodeString from "../toCodeString";
// import simplifyTypeExpression from "../analysis/simplifyType";
import combineTypeExpression from "../analysis/combineTypeExpression";
import IdGenerator from "../IdGenerator";
import negateExpression from "../analysis/negate";
import simplify from "../analysis/simplify";
import { isTypeExpression } from "../ast/TypeExpression";
import * as types from "../types"
import getMemberTypeExpression from "../analysis/getMemberTypeExpression";
import { isAbsolute, absolute, join, sanitize, getLastName } from "../pathFunctions";
import isConsequent from "../analysis/isConsequent";

const literalTypes = {
    boolean: types.Boolean,
    number: types.Number,
    object: types.Object,
    string: types.String,
}

function getDeclaration(node: ast.Reference, resolved: Resolved, scopes: ScopeMaps): ast.Declaration {
    node = resolved.get(node) ?? node
    let scope = scopes.get(node) ?? scopes.get(null)
    if (scope == null) {
        console.log("No scope found for ", node)
    }
    let referencedNode = resolved.get(scope[node.name]) ?? scope[node.name]
    if (ast.Declaration.is(referencedNode)) {
        return referencedNode
    }
    else if (ast.Reference.is(referencedNode)) {
        return getDeclaration(referencedNode, resolved, scopes)
    }
    else {
        console.error(`Referenced node is not a declaration ${node.name}`, referencedNode)
        throw new Error("Referenced node is not a declaration")
    }
}

// valid types
// var type: TypeDefinition | Reference | Null = null
//  TypeDefinition => TypeExpression | FunctionType | ClassDeclaration
//  Reference => TypeDefinition

/**
 * If the nodes type is a reference then it will traverse it, otherwise it returns a TypeDefinition
 */
function getTypeDefinitionOrClassDeclaration(node: ast.Typed, resolved: Resolved, scopes: ScopeMaps): ast.TypeDefinition | ast.ClassDeclaration {
    let original = node
    node = resolved.get(node) ?? node
    let nodeType = node.type
    let type = node.type
    while (type != null) {
        if (ast.TypeDefinition.is(type)) {
            return type
        }
        else {
            let declaration = getDeclaration(type, resolved, scopes)
            if (ast.ClassDeclaration.is(declaration)) {
                return declaration
            }
            else {
                type = (declaration as ast.Typed).type
            }
        }
    }
    throw new Error("Type definition not found: " + toCodeString(original) + " type: " + toCodeString(nodeType))
}

function getTypeExpression(type: ast.TypeDefinition | ast.ClassDeclaration): ast.TypeExpression {
    if (ast.ClassDeclaration.is(type)) {
        return type.instanceType!
    }
    if (ast.TypeExpression.is(type)) {
        return type
    }
    throw new Error("getTypeExpression not implemented for " + type.constructor.name)
}

function getChainedConditionalTypeAssertion(ancestors: any[], resolved: Resolved, type: ast.TypeDefinition | ast.Reference, node: ast.Reference, operator: string, negate: boolean) {
    let binaryExpressionIndex = getLastIndex(ancestors, node => ast.BinaryExpression.is(node) && node.operator === operator);
    if (binaryExpressionIndex >= 0) {
        let parent = ancestors[binaryExpressionIndex] as ast.BinaryExpression;
        parent = resolved.get(parent) ?? parent;
        if (parent.operator === operator) {
            //  check if we are the right side.
            //  the parent expression cannot have been resolved yet so we don't have to use resolved.
            if (parent.right === (ancestors[binaryExpressionIndex + 1] ?? node)) {
                // OK, now we just have to check the left side and find a reference with same name.
                // we can then definitely assert that the left expression is true
                let assertion = parent.left
                if (negate) {
                    assertion = negateExpression(assertion)
                }
                let result = createCombinedTypeExpression(type, node.name, assertion, node.location!) as any;
                // console.log({
                //     type: toCodeString(type),
                //     parentLeft: toCodeString(parent.left),
                //     result: toCodeString(result)
                // })
                type = result
            }
        }
    }
    return type;
}

function createCombinedTypeExpression(type: ast.TypeDefinition | ast.Reference, name: String, knownTrueExpression: ast.Expression | null, location: ast.Location) {
    // let ancestorDeclaration = resolved.get(getAncestorDeclaration(node, scopeMap, ancestorsMap, ast.IfStatement.is))
    // now we convert the node assert to a type expression (by replacing variable name references to DotExpressions) so we can combine it.
    let found = 0
    let assertType = knownTrueExpression == null ? null :traverse(knownTrueExpression, {
        leave(node) {
            if (ast.Reference.is(node) && node.name === name) {
                found++
                return new ast.DotExpression({})
            }
        }
    })
    // didn't find any means the expression was irrelevant to the type so we can ignore it
    if (found === 0) {
        return type
    }
    let combinedType = combineTypeExpression(type, assertType)!
    return simplify(new ast.TypeExpression({ location, value: combinedType }))

}

type Resolved = { get<T>(t: T): T }
const binaryOperationsType = {
    "<": types.Boolean,
    ">": types.Boolean,
    "<=": types.Boolean,
    ">=": types.Boolean,
    "==": types.Boolean,
    "!=": types.Boolean,
    "is": types.Boolean,
    "&": types.Boolean,
    "|": types.Boolean,
    "^": types.Number,
    "+": types.Number,
    "-": types.Number,
    "*": types.Number,
    "/": types.Number,
    "%": types.Number,
}

function is(type: ast.Reference | ast.TypeDefinition, left: Expression = new ast.DotExpression({})) {
    return new ast.BinaryExpression({
        location: type.location,
        left,
        operator: "is",
        right: type
    })
}

type InferContext = {
    resolved: Resolved,
    scopeMap: ScopeMaps,
    ancestorsMap: Map<Node, Array<any>>,
    functionFinder: (type: ast.TypeExpression, name: string) => ast.Reference | null,
    originalMap: Resolved,
    // ensureResolved: (node: ast.Typed) => void,
}

// that is some typescript kung fu right there.
export const inferType: {
    [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>, props: InferContext) => any
} = {
    BinaryExpression(node, {resolved}) {
        // for now just use the left type
        let type = binaryOperationsType[node.operator]
        if (type == null) {
            throw SemanticError(`Could not find type for operator: ${node.operator}`, node)
        }
        return { type }
    },
    Literal(node) {
        let jstypeof = typeof node.value
        let type = literalTypes[jstypeof]
        if (type == null) {
            throw SemanticError(`Cannot find type ${jstypeof}`, type)
        }
        return { type }
    },
    ObjectExpression(node, {resolved, scopeMap, ancestorsMap}) {
        let value = new ast.BinaryExpression({
            left: new ast.DotExpression({}),
            operator: "is",
            right: types.Object
        })
        for (let p of node.properties) {
            if (p.key == null) {
                throw SemanticError("Key is required", p)
            }
            let pkey = resolved.get(p.key) ?? p.key
            let pvalue = resolved.get(p.value) ?? p.value
            // if (pvalue.type == null) {
            //     console.log({ pkey, pvalue })
            // }
            value = new ast.BinaryExpression({
                left: value,
                operator: "&",
                right: new ast.BinaryExpression({
                    left: new ast.MemberExpression({ object: new ast.DotExpression({}), property: pkey }),
                    operator: "is",
                    right: pvalue.type!
                })
            })
        }
        let type = new ast.TypeExpression({ value })
        return { type }
    },
    ConditionalDeclaration(node, {resolved, scopeMap, ancestorsMap}) {
        const name = node.id.name
        let ancestors = ancestorsMap.get(node)!
        let containingIf = getLast(ancestors, ast.IfStatement.is)!
        let ancestorDeclaration = resolved.get(getAncestorDeclaration(node, scopeMap, ancestorsMap, ast.IfStatement.is))
        let assertion = containingIf.test
        if (node.negate) {
            assertion = negateExpression(assertion)
        }
        return { type: createCombinedTypeExpression(ancestorDeclaration.type!, name, assertion, node.location!) }
    },
    ClassDeclaration(node, {resolved}) {
        // calculate a TypeExpression that can be used to compare these instances
        let value: Expression = is(new ast.Reference(node.id))
        for (let base of node.baseClasses) {
            value = new ast.BinaryExpression({ left: value, operator: "&", right: is(base) })
        }
        for (let d of node.declarations.values()) {
            d = resolved.get(d) ?? d
            if (ast.VariableDeclaration.is(d) && d.assignable) {
                value = new ast.BinaryExpression({
                    left: value,
                    operator: "&",
                    right: is(d.type!, new ast.MemberExpression({ object: new ast.DotExpression({}), property: d.id }))
                })
                // if (!d.assignable && d.value != null) {
                //     // constant => we can add a specifier that 
                //     value = new ast.BinaryExpression({
                //         left: value,
                //         operator: "==",
                //         right: new ast.BinaryExpression({
                //             left: new ast.MemberExpression({ object: new ast.DotExpression({}), property: d.id }),
                //             operator: "==",
                //             right: d.value!
                //         })
                //     })
                // }
            }
        }
        let instanceType = new ast.TypeExpression({ location: node.location, value })
        // TODO: Add static properties as well to type
        return { instanceType, type: types.Class }
    },
    Parameter(node, {resolved}) {
        return inferType.VariableDeclaration?.apply(this, arguments as any)
    },
    VariableDeclaration(node, {resolved}) {
        if (node.value) {
            let value = resolved.get(node.value)
            return { type: value.type }
        }
    },
    FunctionExpression(func, {resolved}) {
        // traverse and find all return types
        let returnTypes: Array<ast.TypeDefinition | ast.Reference> = []
        traverse(func.body, {
            enter(node) {
                if (ast.ReturnStatement.is(node)) {
                    let resolvedValue = resolved.get(node.value)
                    if (resolvedValue.type == null) {
                        throw SemanticError(`Return Value type not resolved`, node)
                    }
                    if (resolvedValue.type != null) {
                        returnTypes.push(resolvedValue.type)
                    }
                    return skip
                }
            }
        })
        let returnType!: ast.Reference | ast.TypeDefinition
        if (returnTypes.length > 1) {
            let value: ast.Expression | null = null
            for (let i = returnTypes.length - 1; i >= 0; i--) {
                let type = returnTypes[i]
                let newNode: Expression = ast.TypeExpression.is(type)
                    ? type.value
                    : new ast.BinaryExpression({ left: new ast.DotExpression({}), operator: "is", right: type, location: type.location})
                value = value != null ? new ast.BinaryExpression({ left: newNode, operator: "|", right: value }) : newNode
            }
            returnType = simplify(new ast.TypeExpression({ location: func.body.location, value: value! })) as any
        }
        else if (returnTypes.length === 0) {
            throw SemanticError(`Function returns no value`, func)
        }
        else if (returnTypes.length === 1) {
            returnType = returnTypes[0]
        }
        // we also need to infer the function signature type
        let type = func.type != null ? func.type : new ast.FunctionType({ parameters: func.parameters, returnType })
        return { returnType, type }
    },
    TypeDeclaration(node) {
        return { type: types.Type }
    },
    Reference(node, {resolved, scopeMap, ancestorsMap}) {
        // if (isAbsoluteName(node.name) && isTypeReference(node)) {
        //     return null
        // }
        let declaration = getDeclaration(node, resolved, scopeMap)
        let type = declaration.type!
        // Infer in chained conditionals here.
        let ancestors = ancestorsMap.get(node)!
        // if we are the right side of a A & B conditional then that implies A
        type = getChainedConditionalTypeAssertion(ancestors, resolved, type, node, "&", false);
        // if we are the right side of a A | B optional then that implies not A
        type = getChainedConditionalTypeAssertion(ancestors, resolved, type, node, "|", true);
        if (type == null) {
            console.error("Reference type not resolved", { declaration })
            throw new Error("Reference type not resolved")
        }
        return { type }
    },
    ArrayExpression(node) {
        // Type of ArrayExpression
        // For now... just Array reference?
        // we would need to find the common base type of multiple type expressions or references.
    },
    UnaryExpression(node, {resolved, scopeMap}) {
        if (node.operator === "typeof") {
            if (ast.Reference.is(node.argument) && isAbsolute(node.argument.name)) {
                let declaration = getDeclaration(node.argument, resolved, scopeMap)
                // typeof just gets the type of a referenced value?
                return { type: declaration.type }
            }
            return { type: types.Type }
        }
        else {
            return { type: node.argument.type }
        }
    },
    CallExpression(node, {resolved, scopeMap, ancestorsMap, functionFinder, originalMap}) {
        if (ast.Reference.is(node.callee)) {
            let declaration = getDeclaration(node.callee, resolved, scopeMap)
            if (ast.ClassDeclaration.is(declaration)) {
                // IF the callee references a ClassDeclaration,
                return { type: node.callee }
            }
            if (ast.VariableDeclaration.is(declaration) && ast.FunctionExpression.is(declaration.value)) {
                let func = resolved.get(declaration.value) ?? declaration.value
                return { type: func.returnType }
            }
        }
        let callee = resolved.get(node.callee) ?? node.callee
        let calleeType = callee.type
        let original = originalMap.get(node) as any
        if (ast.MemberExpression.is(original.callee) && ast.Id.is(original.callee.property) && ast.CallExpression.is(callee)) {
            // callee WAS a MemberExpression before but now it is a CallExpression. That means UFCS conversion.
            // now we have to re-add in our original function arguments.
            // callee is a UFCS function reference, so we must convert this call expression.
            return node.patch({ callee: callee.callee, arguments: [...callee.arguments, ...node.arguments] })
        }

        if (!ast.FunctionType.is(calleeType)) {
            throw SemanticError("Function expected", node.callee)
        }
        return { type: calleeType.returnType }
    },
    MemberExpression(node, {resolved, scopeMap, ancestorsMap, functionFinder}) {
        //  TODO: ClassDeclarations need a proper type, which includes static variables or we fix member ref
        //  this node should now have a type
        let objectType = getTypeDefinitionOrClassDeclaration(node.object, resolved, scopeMap)
        let property = resolved.get(node.property) ?? node.property
        // quick lookup if the type is a class reference.
        if (ast.ClassDeclaration.is(objectType) && ast.Id.is(property)) {
            let declaration = objectType.declarations.get(property.name)
            if (declaration != null) {
                return { type: declaration.type }
            }
        }
        // convert to type expression for another attempted lookup
        let typeExpression = getTypeExpression(objectType)
        if (typeExpression == null) {
            console.log("SD:LKFJS:DLFKJDS:FLKJD:FLKJ:FDLKJDFL:KJ", { objectType, resolved: resolved.get(objectType) })
        }
        let type = getMemberTypeExpression(typeExpression, property)
        if (type != null) {
            return { type }
        }
        if (ast.Id.is(property)) {
            // ufcs lookup baby
            let func = functionFinder(typeExpression, property.name)
            if (func != null) {
                let funcDeclaration = getDeclaration(func, resolved, scopeMap) as ast.VariableDeclaration
                let funcValue = funcDeclaration.value as ast.FunctionExpression
                funcValue = resolved.get(funcValue) ?? funcValue
                // convert this into a function call and add the type
                let result = new ast.CallExpression({
                    location: node.location,
                    callee: func,
                    arguments: [
                        new ast.Property({ location: node.object.location, value: node.object})
                    ],
                    type: funcValue.returnType
                })
                return result
            }
        }
        throw SemanticError(`Member '${toCodeString(property)}' not found on ${toCodeString(objectType)}`, node)
    },
}

const emptyLocation = new ast.Location({ start: new ast.Position(0, 0), end: new ast.Position(0, 0), filename: "inferType.empty" })
const typesFile = join("ion", "types")
const typeProperties = ["type", "returnType"]

export default function inferTypes(root: Analysis) {
    let identifiers = new Set<string>()
    let ancestorsMap = new Map<Node, Array<any>>()
    let scopes = createScopeMaps(root, { ancestorsMap, identifiers })
    let resolved = new Map<ast.Typed,ast.Typed>() as Map<ast.Typed,ast.Typed> & Resolved
    let sorted = getSortedTypedNodes(root, scopes, ancestorsMap)
    // let idGenerator = new IdGenerator(identifiers)
    let newTypeDeclarations = new Map<string, ast.TypeDeclaration>()
    let typeNameToIdentifierName = new Map<string,string>()
    let originalMap = new Map<ast.Typed,ast.Typed>()
    for (let typed of sorted) {
        originalMap.set(typed, typed)
    }

    let functionsByName = new Map<string, Array<ast.VariableDeclaration & { value: ast.FunctionExpression}>>()
    for (let t of sorted) {
        if (ast.VariableDeclaration.is(t) && !t.assignable && ast.FunctionExpression.is(t.value)) {
            let name = getLastName(t.id.name)
            let array = functionsByName.get(name)
            if (array == null) {
                functionsByName.set(name, array = [])
            }
            array.push(t as any)
        }
    }

    function uniformFunctionCallFinder(type: ast.TypeExpression, name: string): ast.Reference | null {
        // brute force check all functions
        let functions = functionsByName.get(name)
        if (functions != null) {
            for (let declaration of functions) {
                declaration = resolved.get(declaration) ?? declaration as any
                let func = (resolved.get(declaration.value) ?? declaration.value) as ast.FunctionExpression
                let first = resolved.get(func.parameters[0]) ?? func.parameters[0]
                let firstParameterType = getTypeExpression(getTypeDefinitionOrClassDeclaration(first, resolved, scopes))
                if (isConsequent(type, firstParameterType) === true) {
                    // ensure this func is has already been resolved
                    let originalNode = originalMap.get(func)!
                    func = ensureResolved(originalNode, true) as ast.FunctionExpression
                    return new ast.Reference({ name: declaration.id.name })
                }
            }
        }
        return null
    }

    function getSharedTypeReference(node: ast.TypeDefinition) {
        let name = toCodeString(node)
        let absoluteName = typeNameToIdentifierName.get(name)
        if (absoluteName == null) {
            let localName = preferredTypeNameToIdentifierName.get(name) ?? sanitize(name) // idGenerator.createNewIdName(name)
            absoluteName = absolute(typesFile, localName)
            typeNameToIdentifierName.set(name, absoluteName)
            // see if we can find sub-nodes within this thingy
            let declaration = new ast.TypeDeclaration({
                location: emptyLocation.patch({ filename: typesFile }),
                id: new ast.Id({ location: node.location, name: absoluteName }),
                value: traverse(node, {
                    leave(child) {
                        if (child !== node) {
                            let code = toCodeString(child)
                            let foundSubexpression = preferredTypeNameToIdentifierName.get(code)
                            if (foundSubexpression) {
                                return new ast.Reference({ name: foundSubexpression })
                            }
                        }
                    }
                }),
                export: true,
            })
            newTypeDeclarations.set(absoluteName, declaration)
        }
        return new ast.Reference({ location: node.location, name: absoluteName })
    }
    function setResolved(originalNode, currentNode) {
        resolved.set(originalNode, currentNode)
        if (originalNode !== currentNode) {
            // make sure that you can still get the correct scope for the new node
            scopes.set(currentNode, scopes.get(originalNode))
            // same for ancestors map
            ancestorsMap.set(currentNode, ancestorsMap.get(originalNode)!)
            // same for originals map
            originalMap.set(currentNode, originalMap.get(originalNode)!)
        }
    }
    let preferredTypeNameToIdentifierName = new Map<string,string>()

    function ensureResolved(originalNode: ast.Typed, resolveDependenciesFirst = false) {
        if (resolved.has(originalNode)) {
            return resolved.get(originalNode)
        }

        if (resolveDependenciesFirst) {
            for (let pred of getPredecessors(originalNode, scopes, ancestorsMap)) {
                ensureResolved(pred, resolveDependenciesFirst)
            }
        }

        let context = { resolved, scopeMap: scopes, ancestorsMap, functionFinder: uniformFunctionCallFinder, originalMap}
        // first try to simplify
        let currentNode = resolved.get(originalNode) as ast.Typed ?? originalNode
        currentNode = evaluate(currentNode, resolved, scopes)
        setResolved(originalNode, currentNode)
        // then try to infer types
        if (currentNode.type == null) {
            let func = inferType[currentNode.constructor.name]
            let changes = func?.(currentNode, context)
            // if (ast.FunctionExpression.is(currentNode)) {
            //     console.log(">>>>>>>>> resolved function: " + toCodeString(currentNode))
            // }
            if (changes != null) {
                if (ast.Typed.is(changes)) {
                    // we track these so they don't get properties merged later but are returned as is.
                    customConvertedNodes.add(changes)
                    currentNode = changes
                }
                else {
                    currentNode = currentNode.patch(changes)
                }
            }
            setResolved(originalNode, currentNode)
        }
        if (ast.Declaration.is(currentNode) && isAbsolute(currentNode.id.name)) {
            let name = currentNode.id.name
            let code = toCodeString(currentNode.type!)
            if (!ast.Reference.is(currentNode.type) && name.length < code.length) {
                preferredTypeNameToIdentifierName.set(code, `typeof ${sanitize(name)}`)
            }
        }
        return currentNode
    }
    // in order of preference: absolute path declaration... that's it.
    // we iterate all of the typed nodes in dependency order and resolve their actual types
    let customConvertedNodes = new Set<ast.Typed>()
    for (let originalNode of sorted) {
        ensureResolved(originalNode)
    }
    // console.log(preferredTypeNameToIdentifierName)

    root = traverse(root, {
        merge(node, changes, helper) {
            let result = resolved.get(node)
            if (customConvertedNodes.has(result)) {
                return result
            }
            if (result) {
                for (let name of typeProperties) {
                    let value = result[name]
                    if (ast.TypeDefinition.is(value)) {
                        // move to a shared location and replace with a reference.
                        result = result!.patch({ [name]: getSharedTypeReference(value) })
                    }
                }
            }
            if (result) {
                return ast.Typed.is(changes) ? changes : helper.patch(result, changes)
            }
        }
    })

    // console.log(Array.from(newTypeDeclarations.keys()))

    // now return a new root with merged in new type declarations.
    return new Analysis({
        declarations: new Map([...root.declarations.entries(), ...newTypeDeclarations.entries()])
    })
}

import * as ast from "./ast";
import { Node } from "./ast";
import { memoize, SemanticError } from "./common";
import { isAbsolutePath } from "./pathFunctions";

function block(nodes, open = "{", close = "}", indent = '    ') {
    if (nodes == null || nodes.length === 0) {
        return `${open}${close}`;
    }
    // return nodes.map(s).join(`\n`)
    return (`${open}\n${nodes.map(s).join(`\n`).split(`\n`).map(a => indent + a).join(`\n`)}\n${close}`);
}

function toName(node: ast.Identifier) {
    let { name } = node
    return name.indexOf('.') >= 0 ? "`" + name + "`" : name
}

function meta(node: ast.Meta) {
    return block(node.meta, "", "", "")
}

const codeToString: { [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>) => string} = {
    Identifier: toName,
    Declarator: toName,
    Reference: toName,
    ReferenceType: toName,
    NotType(node) {
        return `!${s(node.value)}`
    },
    ObjectType(node) {
        let content = node.properties.map(toCodeString).join(', ')
        switch(node.kind) {
            case "Object": return `(${content})`
            case "Array": return `[${content}]`
            case "Map": return `{${content}}`
            default: throw new Error(`Unrecognized ObjectType.kind: ${node.kind}`)
        }
    },
    TypeExpression(node) {
        return s(node.value)
    },
    NeverType(node) {
        return "Never"
    },
    SpreadType(node) {
        return `...(${node.types.map(s).join(",")})`
    },
    NumberType(node) {
        if (node.min == null && node.max == null) {
            return `Number`
        }
        if (node.min && node.max && s(node.min) === s(node.max)) {
            return `(${s(node.min)})`
        }
        let text = `(`
        if (node.min) {
            text += `${node.minExclusive ? ">" : (node.max ? "" : ">=")}${s(node.min)}`
        }
        if (node.max) {
            if (node.min) {
                text += `..`
            }
            text += `${node.maxExclusive ? "<" : (node.min ? "" : "<=")}${s(node.max)}`
        }
        return text + `)`
    },
    DotExpression(node) {
        return "."
    },
    ThisExpression(node) {
        return "this"
    },
    // AssignmentPattern(node) {
    //     return `${toCodeString(node.left)} = ${toCodeString(node.right)}`
    // },
    ObjectPattern(node) {
        return `{ ${node.properties.map(toCodeString).join(', ')} }`
    },
    ObjectExpression(node) {
        return `{ ${node.body.map(toCodeString).join(', ')} }`
    },
    Argument(node) {
        return node.id ? `${s(node.id)} = ${s(node.value)}` : s(node.value)
    },
    ArrayExpression(node) {
        return block(node.body, '[', ']')
    },
    UnionType(node) {
        return `${node.types.map(toCodeString).join(' | ')}`
    },
    IntersectionType(node) {
        return `${node.types.map(toCodeString).join(' & ')}`
    },
    FunctionExpression(node) {
        return `function ${(node.id as any)?.name ?? ''}${block(node.parameters, "(", ")")} => ${block(node.body.body)}`
    },
    FunctionType(node) {
        return `${block(node.parameters, "(", ")")} => ${toCodeString(node.returnType)}`
    },
    Property(node) {
        if (node.value == null) {
            throw SemanticError(`Node.value missing!?`, node)
        }
        if (node.id != null) {
            if (ast.Identifier.is(node.id) || ast.ReferenceType.is(node.id)) {
                return `${s(node.id)}:${s(node.value!)}`
            }
            else {
                return `[${s(node.id)}]:${s(node.value!)}`
            }
        }
        return `${s(node.value!)}`
    },
    ConditionalDeclaration(node) {
        return codeToString.Variable!(node as any)
    },
    Parameter(node) {
        return codeToString.Variable!(node as any)
    },
    Variable(node) {
        let value = meta(node)
        if (!node.isTypeParameter) {
            if (ast.ConditionalDeclaration.is(node)) {
                value += `cond `
            }
            else {
                if (node.isMutable) {
                    value += `var `
                }
                else {
                    value += `const `
                }
            }
            if (node.isStatic) {
                value += `static `
            }
            if (node.isType) {
                value += `type `
            }
            if (node.isMeta) {
                value += `meta `
            }
        }
        value += s(node.id)
        if (node.type) {
            value += `: ${s(node.type)}`
        }
        if (node.value) {
            value += ` = ${s(node.value)}`
        }
        return `${value}`
    },
    Literal(node) {
        return JSON.stringify(node.value)
    },
    BinaryExpression(node) {
        return `(${s(node.left)} ${node.operator} ${s(node.right)})`
    },
    UnaryExpression(node) {
        return `${node.operator} ${s(node.argument)}`
    },
    MemberExpression(node) {
        if (ast.Identifier.is(node.property)) {
            return `${s(node.object)}.${s(node.property)}`
        }
        else {
            return `${s(node.object)}[${s(node.property)}]`
        }
    },
    Call(node) {
        return `${node.callee ? s(node.callee) : ""}(${node.arguments.map(s).join(', ')})`
    },
    Conditional(node) {
        let result =`if ${s(node.test)} ${s(node.consequent)}`
        if (node.alternate) {
            result += ` else ${s(node.alternate)}`
        }
        return result
    },
    Module(node) {
        return `module ${node.name} ${codeToString.Block!(node as any)}`
    },
    ClassDeclaration(node) {
        if (node.typeParameters.length > 0)
            return `${meta(node)} class ${node.id.name}<${node.typeParameters.map(s).join(",")}> ${block(node.declarations)}`
        else
            return `${meta(node)} class ${node.id.name} ${block(node.declarations)}`
    },
    Block(node) {
        let value = block(node.body)
        if (node.type) {
            value += `: (${s(node.type)})`
        }
        return value
    },
    Return(node) {
        return `return ${toCodeString(node.value)}`
    },
    Spread(node) {
        return `...${toCodeString(node.value)}`
    },
    RestElement(node) {
        return `...${toCodeString(node.value)}`
    },
    RegularExpression(node) {
        return `/${node.pattern}/${node.flags}`
    }
}


const s = //memoize(
    function (node: Node) {
        if (node == null) {
            throw new Error("Cannot call toCodeString on a null node")
        }
        let fn = codeToString[node.constructor.name]
        if (fn == null) {
            throw new Error(`codeToString function not found for type: ${node.constructor.name}`)
        }
        return fn(node)
    }
//)

export default function toCodeString(node: Node | null | undefined): string {
    if (node === undefined) {
        return "undefined"
    }
    if (node == null) {
        return "null"
    }
    return s(node)
}
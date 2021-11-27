import * as ast from "./ast";
import { Node } from "./ast";
import { memoize } from "./common";

const codeToString: { [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>) => string} = {
    Identifier(node) {
        return node.name
    },
    Declarator(node) {
        return node.name
    },
    Reference(node) {
        return node.name
    },
    ReferenceType(node) {
        return node.name
    },
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
    NumberType(node) {
        if (node.min == null && node.max == null) {
            return `Number`
        }
        if (node.min && node.max && s(node.min) === s(node.max)) {
            return `(${s(node.min)})`
        }
        let text = `(`
        if (node.min) {
            text += `${node.minExclusive ? ">" : ">="}${s(node.min)}`
        }
        if (node.max) {
            if (node.min) {
                text += `..`
            }
            text += `${node.maxExclusive ? "<" : "<="}${s(node.max)}`
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
    ArrayExpression(node) {
        return `[ ${node.body.map(toCodeString).join(', ')} ]`
    },
    UnionType(node) {
        return `${node.types.map(toCodeString).join(' | ')}`
    },
    IntersectionType(node) {
        return `${node.types.map(toCodeString).join(' & ')}`
    },
    Module(node) {
        return `module ${node.name}`
    },
    FunctionExpression(node) {
        return `function ${(node.id as any)?.name ?? ''}(${node.parameters.map(toCodeString).join(',')})`
    },
    ArrowFunctionExpression(node) {
        return `(${node.params.map(toCodeString).join(',')}) => {?}`
    },
    FunctionType(node) {
        return `(${node.parameters.map(toCodeString).join(',')}) => ${toCodeString(node.returnType)}`
    },
    ClassDeclaration(node) {
        return `class ${node.id.name}`
    },
    Property(node) {
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
        let value = s(node.id)
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
        return `${node.operator}${s(node.argument)}`
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
        let result =`(if ${s(node.test)} then ${s(node.consequent)}`
        if (node.alternate) {
            result += ` else ${s(node.alternate)} end`
        }
        else {
            result += ` end)`
        }
        return result
    },
    Block(node) {
        return `{ ${node.body.map(s).join('; ')} }`
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


const s = memoize(
    function (node: Node) {
        let fn = codeToString[node.constructor.name]
        if (fn == null) {
            throw new Error(`codeToString function not found for type: ${node.constructor.name}`)
        }
        return fn(node)
    }
)

export default function toCodeString(node: Node | null): string {
    if (node == null) {
        return "null"
    }
    return s(node)
}
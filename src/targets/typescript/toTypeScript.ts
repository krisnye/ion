import { Assembly, Output, Node } from "../../ast";
import { CodeWriter } from "../../CodeWriter";
import * as ast from "../../ast";
import { isValidTypescriptId } from "./reservedWords";
import { getLastName } from "../../pathFunctions";
import { traverse } from "../../Traversal";
import * as types from "../../types";
import toCodeString from "../../toCodeString";
import toUnionType from "../../analysis/toUnionType";

const operatorMap = {
    "==": "===",
    "!=": "!==",
}

const writeNodes: { [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>, writer: CodeWriter) => void} = {
    Module(node, writer) {
        for (let declaration of node.declarations) {
            write(declaration, writer)
        }
    },
    ExpressionStatement(node, writer) {
        writer.dent()
        write(node.value, writer)
        writer.newline(";")
    },
    Id(node, writer) {
        writer.write(node.name)
    },
    Literal(node, writer) {
        writer.write(JSON.stringify(node.value))
    },
    ImportDeclaration(node, writer) {
        writer.line(`import * as ${node.id.name} from ${JSON.stringify(node.from)};`)
    },
    CallExpression(node, writer) {
        write(node.callee, writer)
        writer.write("(")
        writeList(node.arguments.map(p => p.value), writer)
        writer.write(")")
    },
    Property(node, writer) {
        if (node.key) {
            if (ast.Id.is(node.key)) {
                write(node.key, writer)
            }
            else {
                writer.write('[')
                write(node.key, writer)
                writer.write(']')
            }
            writer.write(': ')
        }
        write(node.value, writer)
    },
    ObjectExpression(node, writer) {
        writer.indent('{')
        for (let property of node.properties) {
            writer.dent()
            if (ast.Id.is(property.key) && ast.Reference.is(property.value) && property.key.name === property.value.name) {
                write(property.key, writer)
            }
            else {
                write(property, writer)
            }
            writer.newline(",")
        }
        writer.outdent('}')
    },
    VariableDeclaration(node, writer) {
        maybeExport(node, writer)
        if (ast.FunctionExpression.is(node.value)) {
            let fn = node.value
            writer.write('function ')
            if (fn.id == null) {
                fn = fn.patch({ id: node.id })
            }
            write(fn!, writer)
            writer.newline()
        }
        else {
            writer.write('const ', node.id.name, ' = ')
            write(node.value!, writer)
            writer.newline(';')
        }
    },
    MemberExpression(node, writer) {
        write(node.object, writer)
        if (ast.Id.is(node.property)) {
            writer.write('.')
            write(node.property, writer)
        }
        else {
            writer.write('[')
            write(node.property, writer)
            writer.write(']')
        }
    },
    Reference(node, writer) {
        writer.write(node.name)
    },
    BinaryExpression(node, writer) {
        writer.write('(')
        write(node.left, writer)
        writer.write(' ', operatorMap[node.operator] ?? node.operator, ' ')
        write(node.right, writer)
        writer.write(')')
    },
    ReturnStatement(node, writer) {
        writer.dent().write('return ')
        write(node.value, writer)
        writer.newline(';')
    },
    FunctionExpression(node, writer) {
        writer.write(node.id?.name, '(')
        writeList(node.parameters, writer)
        writer.write(')').newline()
        write(node.body, writer)
    },
    BlockStatement(node, writer) {
        writer.indent()
        for (let statement of node.statements) {
            write(statement, writer)
        }
        writer.outdent()
    },
    Parameter(node, writer) {
        writer.write(node.id.name)
        if (node.type) {
            writer.write(': ')
            write(node.type, writer)
        }
        if (node.value) {
            writer.write(' = ')
            write(node.value, writer)
        }
    },
    FunctionType(node, writer) {
        writer.write('(')
        writeList(node.parameters, writer)
        writer.write(') => ')
        writeType(node.returnType, writer)
    },
    DotExpression(node, writer) {
        writer.write(".")
    },
    TypeExpression(node, writer) {
        //  convert to union type,
        //  remove any bullshit expressions
        // let unionType = traverse(toUnionType(node), {
        //     leave(node) {
        //         if (ast.BinaryExpression.is(node) && node.operator === "is") {
        //             return node.right
        //         }
        //     }
        // })
        writeType(node.value, writer)
    },
    TypeDeclaration(node, writer) {
        writer.dent().write('type ', node.id.name, ' = ')
        writeType(node.value, writer)
        writer.newline()
    },
    ClassDeclaration(node, writer) {
        maybeExport(node, writer)
        writer.write('class ', node.id.name).newline()
        writer.indent()
        for (let name of node.declarations.keys()) {
            let d = node.declarations.get(name)
            if (ast.VariableDeclaration.is(d)) {
                writer.dent()
                if (!d.assignable && ast.FunctionExpression.is(d.value)) {
                    // write out as a function
                    write(d.value, writer)
                    writer.newline()
                }
                else {
                    if (!d.assignable) {
                        writer.write("readonly ")
                    }
                    if (isValidTypescriptId(name)) {
                        writer.write(name)
                    }
                    else {
                        writer.write("[", JSON.stringify(name), "]")
                    }
                    let shouldWriteType = !(d.value != null && !d.assignable)
                    if (shouldWriteType) {
                        writer.write(": ")
                        writeType(d.type!, writer)
                    }
                    if (d.value != null) {
                        writer.write(" = ")
                        write(d.value, writer)
                    }
                    writer.newline(';')
                }
            }
        }
        writer.outdent()
    }
}

function maybeExport(node: ast.Declaration, writer: CodeWriter) {
    writer.dent()
    if (node.export) {
        writer.write("export ")
        if (node.export === 2) {
            writer.write("default ")
        }
    }
}

export function writeType(node, writer: CodeWriter) {
    // console.log(">>>>>>> " + toCodeString(node))
    let dotMembers = new Array<ast.BinaryExpression & { left: ast.MemberExpression }>()
    let newType = traverse(node, {
        leave(node) {
            if (ast.BinaryExpression.is(node)) {
                if (node.left === types.Never) {
                    return node.right
                }
                if (node.right === types.Never) {
                    return node.left
                }
                if (node.operator === "is") {
                    if (ast.DotExpression.is(node.left)) {
                        return node.right
                    }
                    if (ast.MemberExpression.is(node.left)) {
                        dotMembers.push(node as any)
                        return types.Never
                    }
                }
            }
        }
    })

    //  So.. if it's a MemberExpression with a dot on the left... then great?
    //  TODO: Figure out how to recursively convert member expressions to a
    let thisMembers = dotMembers.filter(d =>  ast.DotExpression.is(d.left.object))
    // right now we are ignoring anything recursive like .foo.bar: Number
    if (thisMembers.length > 0) {
        // // now convert to an ObjectExpression
        let objectType = new ast.ObjectExpression({
            properties: thisMembers.map(t => new ast.Property({
                key: t.left.property,
                value: t.right
            }) )
        })
        newType = new ast.BinaryExpression({
            left: newType,
            operator: "&",
            right: objectType
        })
    }

    return write(newType, writer)
}

function writeList(items:  ReadonlyArray<ast.Node>, writer: CodeWriter, delimiter = ", ") {
    let count = 0
    let newlines = delimiter.indexOf('\n') >= 0
    for (let item of items) {
        if (newlines) {
            writer.dent()
        }
        else {
            if (count++ > 0) {
                writer.write(delimiter)
            }
        }
        write(item, writer)
        if (newlines) {
            writer.write(delimiter)
        }
    }
    return writer
}

let noFunction = new Set<string>()
function write(node: Node, writer: CodeWriter) {
    let { name } = node.constructor
    let writeFunction = writeNodes[name]
    if (writeFunction) {
        writeFunction(node, writer)
    }
    else {
        if (!noFunction.has(name)) {
            noFunction.add(name)
            console.warn(`======= No toTypeScript function for ${name}`)
        }
    }
    return writer
}

export default function toTypeScript(root: Assembly) {
    let files = new Map<string, string>()
    for (let name of root.modules.keys()) {
        let module = root.modules.get(name)!
        let code = write(module, new CodeWriter()).toString()
        files.set(name, code)
    }
    return new Output({ files })
}
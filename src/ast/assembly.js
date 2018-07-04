'use strict';
const ion_Null = (Object.freeze({
    is(value) {
        return value == null
    }
}));
const ion_String = (Object.freeze({
    is(value) {
        return typeof value === 'string'
    },
    length(value) {
        return value.length
    },
    trimmed(value) {
        return value.trim()
    }
}));
const ion_Boolean = (Object.freeze({
    is(value) {
        return value === true || value === false
    }
}));
const ion_ast_Node = Object.freeze(Object.assign(class Node {
    constructor() {
        throw new Error('Node is abstract');
    }
}, {
    types: new Set(['ion.ast.Node']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Node')),
    path: 'ion.ast.Node'
}));
const ion_ast_Declaration = Object.freeze(Object.assign(class Declaration {
    constructor() {
        throw new Error('Declaration is abstract');
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.Declaration'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Declaration')),
    path: 'ion.ast.Declaration'
}));
const ion_ast_ClassDeclaration = Object.freeze(Object.assign(class ClassDeclaration {
    constructor(...args) {
        let location = null, id, isStructure = false, isAbstract = false, templateParameters, baseClasses, declarations, meta;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.id !== undefined)
                    id = arg.id;
                if (arg.isStructure !== undefined)
                    isStructure = arg.isStructure;
                if (arg.isAbstract !== undefined)
                    isAbstract = arg.isAbstract;
                if (arg.templateParameters !== undefined)
                    templateParameters = arg.templateParameters;
                if (arg.baseClasses !== undefined)
                    baseClasses = arg.baseClasses;
                if (arg.declarations !== undefined)
                    declarations = arg.declarations;
                if (arg.meta !== undefined)
                    meta = arg.meta;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Id.is(id))
            throw new Error('id is not valid: ' + JSON.stringify(id));
        if (!ion_Boolean.is(isStructure))
            throw new Error('isStructure is not valid: ' + JSON.stringify(isStructure));
        if (!ion_Boolean.is(isAbstract))
            throw new Error('isAbstract is not valid: ' + JSON.stringify(isAbstract));
        if (!ion_Array.is(templateParameters, ion_ast_Parameter))
            throw new Error('templateParameters is not valid: ' + JSON.stringify(templateParameters));
        if (!ion_Array.is(baseClasses, ion_ast_TypeExpression))
            throw new Error('baseClasses is not valid: ' + JSON.stringify(baseClasses));
        if (!ion_Array.is(declarations, ion_ast_Declaration))
            throw new Error('declarations is not valid: ' + JSON.stringify(declarations));
        if (!ion_Array.is(meta, ion_ast_Property))
            throw new Error('meta is not valid: ' + JSON.stringify(meta));
        this.location = location;
        this.id = id;
        this.isStructure = isStructure;
        this.isAbstract = isAbstract;
        this.templateParameters = templateParameters;
        this.baseClasses = baseClasses;
        this.declarations = declarations;
        this.meta = meta;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Declaration',
        'ion.ast.Node',
        'ion.ast.ClassDeclaration'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.ClassDeclaration')),
    path: 'ion.ast.ClassDeclaration'
}));
const ion_ast_Expression = Object.freeze(Object.assign(class Expression {
    constructor() {
        throw new Error('Expression is abstract');
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.Expression'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Expression')),
    path: 'ion.ast.Expression'
}));
const ion_ast_Argument = Object.freeze(Object.assign(class Argument {
    constructor(...args) {
        let location = null, id = null, value;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.id !== undefined)
                    id = arg.id;
                if (arg.value !== undefined)
                    value = arg.value;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!{ is: $ => ion_ast_Id.is($) || ion_Null.is($) }.is(id))
            throw new Error('id is not valid: ' + JSON.stringify(id));
        if (!ion_ast_Expression.is(value))
            throw new Error('value is not valid: ' + JSON.stringify(value));
        this.location = location;
        this.id = id;
        this.value = value;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.Argument'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Argument')),
    path: 'ion.ast.Argument'
}));
const ion_ast_BinaryExpression = Object.freeze(Object.assign(class BinaryExpression {
    constructor(...args) {
        let location = null, left, operator, right;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.left !== undefined)
                    left = arg.left;
                if (arg.operator !== undefined)
                    operator = arg.operator;
                if (arg.right !== undefined)
                    right = arg.right;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Expression.is(left))
            throw new Error('left is not valid: ' + JSON.stringify(left));
        if (!ion_String.is(operator))
            throw new Error('operator is not valid: ' + JSON.stringify(operator));
        if (!ion_ast_Expression.is(right))
            throw new Error('right is not valid: ' + JSON.stringify(right));
        this.location = location;
        this.left = left;
        this.operator = operator;
        this.right = right;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.BinaryExpression'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.BinaryExpression')),
    path: 'ion.ast.BinaryExpression'
}));
const ion_ast_CallExpression = Object.freeze(Object.assign(class CallExpression {
    constructor(...args) {
        let location = null, callee, $arguments;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.callee !== undefined)
                    callee = arg.callee;
                if (arg.arguments !== undefined)
                    $arguments = arg.arguments;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Expression.is(callee))
            throw new Error('callee is not valid: ' + JSON.stringify(callee));
        if (!ion_Array.is($arguments, ion_ast_Argument))
            throw new Error('$arguments is not valid: ' + JSON.stringify($arguments));
        this.location = location;
        this.callee = callee;
        this.arguments = $arguments;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.CallExpression'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.CallExpression')),
    path: 'ion.ast.CallExpression'
}));
const ion_ast_DotExpression = Object.freeze(Object.assign(class DotExpression {
    constructor(...args) {
        let location = null;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        this.location = location;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.DotExpression'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.DotExpression')),
    path: 'ion.ast.DotExpression'
}));
const ion_ast_Id = Object.freeze(Object.assign(class Id {
    constructor(...args) {
        let location = null, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_String.is(name))
            throw new Error('name is not valid: ' + JSON.stringify(name));
        this.location = location;
        this.name = name;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.Id'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Id')),
    path: 'ion.ast.Id'
}));
const ion_ast_ImportStep = Object.freeze(Object.assign(class ImportStep {
    constructor(...args) {
        let location = null, relative = false, id = null, as = null, children;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.relative !== undefined)
                    relative = arg.relative;
                if (arg.id !== undefined)
                    id = arg.id;
                if (arg.as !== undefined)
                    as = arg.as;
                if (arg.children !== undefined)
                    children = arg.children;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_Boolean.is(relative))
            throw new Error('relative is not valid: ' + JSON.stringify(relative));
        if (!{ is: $ => ion_ast_Id.is($) || ion_Null.is($) }.is(id))
            throw new Error('id is not valid: ' + JSON.stringify(id));
        if (!{ is: $ => ion_ast_Id.is($) || ion_Null.is($) }.is(as))
            throw new Error('as is not valid: ' + JSON.stringify(as));
        if (!ion_Array.is(children, ion_ast_ImportStep))
            throw new Error('children is not valid: ' + JSON.stringify(children));
        this.location = location;
        this.relative = relative;
        this.id = id;
        this.as = as;
        this.children = children;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.ImportStep'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.ImportStep')),
    path: 'ion.ast.ImportStep'
}));
const ion_Map = ((function(){
    function createImmutableMap(map) {
        return Object.freeze(Object.assign(map, {
            clear() {},
            delete() {},
            set() {}
        }))
    }
    const emptyMap = createImmutableMap(new Map())
    return Object.freeze(Object.assign(function ion_Map(...keyValues){
        if (keyValues.length === 0)
            return emptyMap
        let map = new Map()
        for (let i = 0; i < keyValues.length; i += 2) {
            // if keyValues length is odd then last value will be null
            let key = keyValues[i + 0]
            let value = keyValues[i + 1]
            if (key === undefined)
                key = null
            if (value === undefined)
                value = null
            map.set(key, value)
        }
        return createImmutableMap(map)
    }, {
        is(value, KeyType, ValueType) {
            // TODO: Once calculated on an instance we could cache the result with a unique Symbol.
            if (value !== emptyMap) {
                if (!(value instanceof Map))
                    return false
                for (let k of value.keys()) {
                    if (!KeyType.is(k))
                        return false
                }
                for (let v of value.values()) {
                    if (!ValueType.is(v))
                        return false
                }
            }
            value.toJSON = function() {
                return { elements: Array.from(this.entries()) }
            }
            return true
        }
    }))
})());
const ion_ast_Options = Object.freeze(Object.assign(class Options {
    constructor(...args) {
        let input, output;
        for (let arg of args) {
            if (arg != null) {
                if (arg.input !== undefined)
                    input = arg.input;
                if (arg.output !== undefined)
                    output = arg.output;
            }
        }
        if (!ion_Array.is(input, ion_String))
            throw new Error('input is not valid: ' + JSON.stringify(input));
        if (!ion_String.is(output))
            throw new Error('output is not valid: ' + JSON.stringify(output));
        this.input = input;
        this.output = output;
        Object.freeze(this);
    }
}, {
    types: new Set(['ion.ast.Options']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Options')),
    path: 'ion.ast.Options'
}));
const ion_ast_Literal = Object.freeze(Object.assign(class Literal {
    constructor(...args) {
        let location = null, value;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.value !== undefined)
                    value = arg.value;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Primitive.is(value))
            throw new Error('value is not valid: ' + JSON.stringify(value));
        this.location = location;
        this.value = value;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.Literal'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Literal')),
    path: 'ion.ast.Literal'
}));
const ion_ast_Position = Object.freeze(Object.assign(class Position {
    constructor(...args) {
        let line, column;
        for (let arg of args) {
            if (arg != null) {
                if (arg.line !== undefined)
                    line = arg.line;
                if (arg.column !== undefined)
                    column = arg.column;
            }
        }
        if (!{ is: $ => ion_Integer.is($) && $ >= 1 }.is(line))
            throw new Error('line is not valid: ' + JSON.stringify(line));
        if (!{ is: $ => ion_Integer.is($) && $ >= 0 }.is(column))
            throw new Error('column is not valid: ' + JSON.stringify(column));
        this.line = line;
        this.column = column;
        Object.freeze(this);
    }
}, {
    types: new Set(['ion.ast.Position']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Position')),
    path: 'ion.ast.Position'
}));
const ion_ast_MemberExpression = Object.freeze(Object.assign(class MemberExpression {
    constructor(...args) {
        let location = null, object, property;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.object !== undefined)
                    object = arg.object;
                if (arg.property !== undefined)
                    property = arg.property;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Expression.is(object))
            throw new Error('object is not valid: ' + JSON.stringify(object));
        if (!ion_ast_Id.is(property))
            throw new Error('property is not valid: ' + JSON.stringify(property));
        this.location = location;
        this.object = object;
        this.property = property;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.MemberExpression'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.MemberExpression')),
    path: 'ion.ast.MemberExpression'
}));
const ion_ast_Module = Object.freeze(Object.assign(class Module {
    constructor(...args) {
        let location = null, imports, declarations, exports;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.imports !== undefined)
                    imports = arg.imports;
                if (arg.declarations !== undefined)
                    declarations = arg.declarations;
                if (arg.exports !== undefined)
                    exports = arg.exports;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_Array.is(imports, ion_ast_ImportStep))
            throw new Error('imports is not valid: ' + JSON.stringify(imports));
        if (!ion_Array.is(declarations, ion_ast_Declaration))
            throw new Error('declarations is not valid: ' + JSON.stringify(declarations));
        if (!{ is: $ => ion_ast_Declaration.is($) || ion_Array.is($, ion_ast_Declaration) }.is(exports))
            throw new Error('exports is not valid: ' + JSON.stringify(exports));
        this.location = location;
        this.imports = imports;
        this.declarations = declarations;
        this.exports = exports;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.Module'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Module')),
    path: 'ion.ast.Module'
}));
const ion_ast_Location = Object.freeze(Object.assign(class Location {
    constructor(...args) {
        let start, end, filename;
        for (let arg of args) {
            if (arg != null) {
                if (arg.start !== undefined)
                    start = arg.start;
                if (arg.end !== undefined)
                    end = arg.end;
                if (arg.filename !== undefined)
                    filename = arg.filename;
            }
        }
        if (!ion_ast_Position.is(start))
            throw new Error('start is not valid: ' + JSON.stringify(start));
        if (!ion_ast_Position.is(end))
            throw new Error('end is not valid: ' + JSON.stringify(end));
        if (!{ is: $ => ion_String.is($) && ($ === ion_String.trimmed($) && ion_String.length($) > 0 && ion_String.length($) < 200) }.is(filename))
            throw new Error('filename is not valid: ' + JSON.stringify(filename));
        this.start = start;
        this.end = end;
        this.filename = filename;
        Object.freeze(this);
    }
}, {
    types: new Set(['ion.ast.Location']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Location')),
    path: 'ion.ast.Location'
}));
const ion_Number = (Object.freeze({
    is(value) {
        return typeof value === 'number'
    },
    integer(value) {
        return value - value % 1
    },
    fraction(value) {
        return value % 1
    }
}));
const ion_ast_Primitive = Object.freeze({ is: $ => ion_String.is($) || (ion_Number.is($) || ion_Boolean.is($)) });
const ion_ast_Property = Object.freeze(Object.assign(class Property {
    constructor(...args) {
        let location = null, key, value;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.key !== undefined)
                    key = arg.key;
                if (arg.value !== undefined)
                    value = arg.value;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Expression.is(key))
            throw new Error('key is not valid: ' + JSON.stringify(key));
        if (!ion_ast_Expression.is(value))
            throw new Error('value is not valid: ' + JSON.stringify(value));
        this.location = location;
        this.key = key;
        this.value = value;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.Property'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Property')),
    path: 'ion.ast.Property'
}));
const ion_ast_Reference = Object.freeze(Object.assign(class Reference {
    constructor(...args) {
        let location = null, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_String.is(name))
            throw new Error('name is not valid: ' + JSON.stringify(name));
        this.location = location;
        this.name = name;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Id',
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.Reference'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Reference')),
    path: 'ion.ast.Reference'
}));
const ion_ast_CanonicalReference = Object.freeze(Object.assign(class CanonicalReference {
    constructor(...args) {
        let location = null, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_String.is(name))
            throw new Error('name is not valid: ' + JSON.stringify(name));
        this.location = location;
        this.name = name;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Reference',
        'ion.ast.Id',
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.CanonicalReference'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.CanonicalReference')),
    path: 'ion.ast.CanonicalReference'
}));
const ion_ast_Statement = Object.freeze(Object.assign(class Statement {
    constructor() {
        throw new Error('Statement is abstract');
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.Statement'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Statement')),
    path: 'ion.ast.Statement'
}));
const ion_Type = (Object.freeze({
    is(value) {
        return value != null && typeof value.is === 'function'
    }
}));
const ion_ast_TypeExpression = Object.freeze(Object.assign(class TypeExpression {
    constructor() {
        throw new Error('TypeExpression is abstract');
    }
}, {
    types: new Set([
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.TypeExpression'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.TypeExpression')),
    path: 'ion.ast.TypeExpression'
}));
const ion_ast_ConstrainedType = Object.freeze(Object.assign(class ConstrainedType {
    constructor(...args) {
        let location = null, baseType, constraint;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.baseType !== undefined)
                    baseType = arg.baseType;
                if (arg.constraint !== undefined)
                    constraint = arg.constraint;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_TypeReference.is(baseType))
            throw new Error('baseType is not valid: ' + JSON.stringify(baseType));
        if (!ion_ast_Expression.is(constraint))
            throw new Error('constraint is not valid: ' + JSON.stringify(constraint));
        this.location = location;
        this.baseType = baseType;
        this.constraint = constraint;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.TypeExpression',
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.ConstrainedType'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.ConstrainedType')),
    path: 'ion.ast.ConstrainedType'
}));
const ion_ast_TemplateReference = Object.freeze(Object.assign(class TemplateReference {
    constructor(...args) {
        let location = null, baseType, $arguments;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.baseType !== undefined)
                    baseType = arg.baseType;
                if (arg.arguments !== undefined)
                    $arguments = arg.arguments;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_TypeReference.is(baseType))
            throw new Error('baseType is not valid: ' + JSON.stringify(baseType));
        if (!ion_Array.is($arguments, { is: $ => ion_Type.is($) || ion_ast_Expression.is($) }))
            throw new Error('$arguments is not valid: ' + JSON.stringify($arguments));
        this.location = location;
        this.baseType = baseType;
        this.arguments = $arguments;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.TypeExpression',
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.TemplateReference'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.TemplateReference')),
    path: 'ion.ast.TemplateReference'
}));
const ion_ast_TypeReference = Object.freeze(Object.assign(class TypeReference {
    constructor(...args) {
        let location = null, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_String.is(name))
            throw new Error('name is not valid: ' + JSON.stringify(name));
        this.location = location;
        this.name = name;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Reference',
        'ion.ast.Id',
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.TypeExpression',
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.TypeReference'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.TypeReference')),
    path: 'ion.ast.TypeReference'
}));
const ion_ast_Variable = Object.freeze(Object.assign(class Variable {
    constructor(...args) {
        let location = null, id, type = null, value = null, assignable = false;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.id !== undefined)
                    id = arg.id;
                if (arg.type !== undefined)
                    type = arg.type;
                if (arg.value !== undefined)
                    value = arg.value;
                if (arg.assignable !== undefined)
                    assignable = arg.assignable;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Id.is(id))
            throw new Error('id is not valid: ' + JSON.stringify(id));
        if (!{ is: $ => ion_ast_TypeExpression.is($) || ion_Null.is($) }.is(type))
            throw new Error('type is not valid: ' + JSON.stringify(type));
        if (!{ is: $ => ion_ast_Expression.is($) || ion_Null.is($) }.is(value))
            throw new Error('value is not valid: ' + JSON.stringify(value));
        if (!ion_Boolean.is(assignable))
            throw new Error('assignable is not valid: ' + JSON.stringify(assignable));
        this.location = location;
        this.id = id;
        this.type = type;
        this.value = value;
        this.assignable = assignable;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Declaration',
        'ion.ast.Node',
        'ion.ast.Variable'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Variable')),
    path: 'ion.ast.Variable'
}));
const ion_ast_InputRoot = Object.freeze(Object.assign(class InputRoot {
    constructor(...args) {
        let options, modules;
        for (let arg of args) {
            if (arg != null) {
                if (arg.options !== undefined)
                    options = arg.options;
                if (arg.modules !== undefined)
                    modules = arg.modules;
            }
        }
        if (!ion_ast_Options.is(options))
            throw new Error('options is not valid: ' + JSON.stringify(options));
        if (!ion_Map.is(modules, ion_String, ion_ast_Module))
            throw new Error('modules is not valid: ' + JSON.stringify(modules));
        this.options = options;
        this.modules = modules;
        Object.freeze(this);
    }
}, {
    types: new Set(['ion.ast.InputRoot']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.InputRoot')),
    path: 'ion.ast.InputRoot'
}));
const ion_Any = (Object.freeze({
    is(value) {
        return value !== undefined
    }
}));
const ion_ast_Parameter = Object.freeze(Object.assign(class Parameter {
    constructor(...args) {
        let location = null, id, type = null, value = null, assignable = false;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.id !== undefined)
                    id = arg.id;
                if (arg.type !== undefined)
                    type = arg.type;
                if (arg.value !== undefined)
                    value = arg.value;
                if (arg.assignable !== undefined)
                    assignable = arg.assignable;
            }
        }
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Id.is(id))
            throw new Error('id is not valid: ' + JSON.stringify(id));
        if (!{ is: $ => ion_ast_TypeExpression.is($) || ion_Null.is($) }.is(type))
            throw new Error('type is not valid: ' + JSON.stringify(type));
        if (!{ is: $ => ion_ast_Expression.is($) || ion_Null.is($) }.is(value))
            throw new Error('value is not valid: ' + JSON.stringify(value));
        if (!ion_Boolean.is(assignable))
            throw new Error('assignable is not valid: ' + JSON.stringify(assignable));
        this.location = location;
        this.id = id;
        this.type = type;
        this.value = value;
        this.assignable = assignable;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Variable',
        'ion.ast.Declaration',
        'ion.ast.Node',
        'ion.ast.Parameter'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Parameter')),
    path: 'ion.ast.Parameter'
}));
const ion_Integer = Object.freeze({ is: $ => ion_Number.is($) && ion_Number.fraction($) === 0 });
const ion_Array = ((function(){
    const emptyArray = Object.freeze([])
    return Object.freeze(Object.assign(function ion_Array(...args){
        return args.length == 0 ? emptyArray : Object.freeze(args)
    }, {
        is(value, ValueType) {
            // TODO: Once calculated on an instance we could cache the result with a unique Symbol.
            if (!Array.isArray(value))
                return false
            for (let element of value) {
                if (!ValueType.is(element))
                    return false
            }
            //  when checking if it is, we will freeze it to ensure it stays a valid array
            //  this allows javascript to create ion arrays with normal array literals: [1,2,3]
            Object.freeze(value)
            return true
        }
    }))
})());
const ion_constants_$Foo = Object.freeze({ is: $ => $ == 0 || $ == 1 });
const ion_constants_$Bar = Object.freeze({ is: $ => $ == 2 || $ == 3 });
const ion_constants_one = 1;
const ion_constants_zero = 0;
const ion_constants_Baz = Object.freeze({ is: $ => ion_constants_$Foo.is($) || ion_constants_$Bar.is($) });
export default Object.freeze({
    ion: Object.freeze({
        Null: ion_Null,
        String: ion_String,
        Boolean: ion_Boolean,
        ast: Object.freeze({
            Node: ion_ast_Node,
            Declaration: ion_ast_Declaration,
            ClassDeclaration: ion_ast_ClassDeclaration,
            Expression: ion_ast_Expression,
            Argument: ion_ast_Argument,
            BinaryExpression: ion_ast_BinaryExpression,
            CallExpression: ion_ast_CallExpression,
            DotExpression: ion_ast_DotExpression,
            Id: ion_ast_Id,
            ImportStep: ion_ast_ImportStep,
            Options: ion_ast_Options,
            Literal: ion_ast_Literal,
            Position: ion_ast_Position,
            MemberExpression: ion_ast_MemberExpression,
            Module: ion_ast_Module,
            Location: ion_ast_Location,
            Primitive: ion_ast_Primitive,
            Property: ion_ast_Property,
            Reference: ion_ast_Reference,
            CanonicalReference: ion_ast_CanonicalReference,
            Statement: ion_ast_Statement,
            TypeExpression: ion_ast_TypeExpression,
            ConstrainedType: ion_ast_ConstrainedType,
            TemplateReference: ion_ast_TemplateReference,
            TypeReference: ion_ast_TypeReference,
            Variable: ion_ast_Variable,
            InputRoot: ion_ast_InputRoot,
            Parameter: ion_ast_Parameter
        }),
        Map: ion_Map,
        Number: ion_Number,
        Type: ion_Type,
        Any: ion_Any,
        Integer: ion_Integer,
        Array: ion_Array,
        constants: Object.freeze({
            one: ion_constants_one,
            zero: ion_constants_zero,
            Baz: ion_constants_Baz
        })
    })
});
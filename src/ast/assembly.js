'use strict';
const ion_Null = (Object.freeze({
    is(value) {
        return value == null
    }
}));
const ion_Boolean = (Object.freeze({
    is(value) {
        return value === true || value === false
    }
}));
const ion_ast_Node = Object.freeze(Object.assign(class Node {
    static create(...args) {
        let location;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
            }
        }
        return new Node(location);
    }
    constructor() {
        throw new Error('Node is abstract');
    }
}, {
    types: new Set(['ion.ast.Node']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Node')),
    path: 'ion.ast.Node'
}));
const ion_ast_Declaration = Object.freeze(Object.assign(class Declaration {
    static create(...args) {
        let location, id;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.id !== undefined)
                    id = arg.id;
            }
        }
        return new Declaration(location, id);
    }
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
    static create(...args) {
        let location, id, isStructure, isAbstract, templateParameters, baseClasses, declarations, meta;
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
        return new ClassDeclaration(location, id, isStructure, isAbstract, templateParameters, baseClasses, declarations, meta);
    }
    constructor(location, id, isStructure = false, isAbstract = false, templateParameters, baseClasses, declarations, meta) {
        if (!ion_ast_Location.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Id.is(id))
            throw new Error('id is not valid: ' + JSON.stringify(id));
        if (!ion_Boolean.is(isStructure))
            throw new Error('isStructure is not valid: ' + JSON.stringify(isStructure));
        if (!ion_Boolean.is(isAbstract))
            throw new Error('isAbstract is not valid: ' + JSON.stringify(isAbstract));
        if (!ion_Array.is(templateParameters, ion_ast_Parameter))
            throw new Error('templateParameters is not valid: ' + JSON.stringify(templateParameters));
        if (!ion_Array.is(baseClasses, ion_ast_Reference))
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
    static create(...args) {
        let location;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
            }
        }
        return new Expression(location);
    }
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
    static create(...args) {
        let location, id, value;
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
        return new Argument(location, id, value);
    }
    constructor(location, id = null, value) {
        if (!ion_ast_Location.is(location))
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
const ion_ast_CallExpression = Object.freeze(Object.assign(class CallExpression {
    static create(...args) {
        let location, callee, __arguments__;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.callee !== undefined)
                    callee = arg.callee;
                if (arg.__arguments__ !== undefined)
                    __arguments__ = arg.__arguments__;
            }
        }
        return new CallExpression(location, callee, __arguments__);
    }
    constructor(location, callee, __arguments__) {
        if (!ion_ast_Location.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_ast_Expression.is(callee))
            throw new Error('callee is not valid: ' + JSON.stringify(callee));
        if (!ion_Array.is(__arguments__, ion_ast_Argument))
            throw new Error('__arguments__ is not valid: ' + JSON.stringify(__arguments__));
        this.location = location;
        this.callee = callee;
        this.__arguments__ = __arguments__;
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
    static create(...args) {
        let location;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
            }
        }
        return new DotExpression(location);
    }
    constructor(location) {
        if (!ion_ast_Location.is(location))
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
const ion_ast_Id = Object.freeze(Object.assign(class Id {
    static create(...args) {
        let location, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        return new Id(location, name);
    }
    constructor(location, name) {
        if (!ion_ast_Location.is(location))
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
    static create(...args) {
        let location, relative, name, as, children;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.relative !== undefined)
                    relative = arg.relative;
                if (arg.name !== undefined)
                    name = arg.name;
                if (arg.as !== undefined)
                    as = arg.as;
                if (arg.children !== undefined)
                    children = arg.children;
            }
        }
        return new ImportStep(location, relative, name, as, children);
    }
    constructor(location, relative = false, name = null, as = null, children) {
        if (!ion_ast_Location.is(location))
            throw new Error('location is not valid: ' + JSON.stringify(location));
        if (!ion_Boolean.is(relative))
            throw new Error('relative is not valid: ' + JSON.stringify(relative));
        if (!{ is: $ => ion_ast_Id.is($) || ion_Null.is($) }.is(name))
            throw new Error('name is not valid: ' + JSON.stringify(name));
        if (!{ is: $ => ion_ast_Id.is($) || ion_Null.is($) }.is(as))
            throw new Error('as is not valid: ' + JSON.stringify(as));
        if (!ion_Array.is(children, ion_ast_ImportStep))
            throw new Error('children is not valid: ' + JSON.stringify(children));
        this.location = location;
        this.relative = relative;
        this.name = name;
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
const ion_ast_Literal = Object.freeze(Object.assign(class Literal {
    static create(...args) {
        let location, value;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.value !== undefined)
                    value = arg.value;
            }
        }
        return new Literal(location, value);
    }
    constructor(location, value) {
        if (!ion_ast_Location.is(location))
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
    static create(...args) {
        let line, column;
        for (let arg of args) {
            if (arg != null) {
                if (arg.line !== undefined)
                    line = arg.line;
                if (arg.column !== undefined)
                    column = arg.column;
            }
        }
        return new Position(line, column);
    }
    constructor(line, column) {
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
const ion_ast_Module = Object.freeze(Object.assign(class Module {
    static create(...args) {
        let location, imports, declarations, exports;
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
        return new Module(location, imports, declarations, exports);
    }
    constructor(location, imports, declarations, exports) {
        if (!ion_ast_Location.is(location))
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
    static create(...args) {
        let start, end, source;
        for (let arg of args) {
            if (arg != null) {
                if (arg.start !== undefined)
                    start = arg.start;
                if (arg.end !== undefined)
                    end = arg.end;
                if (arg.source !== undefined)
                    source = arg.source;
            }
        }
        return new Location(start, end, source);
    }
    constructor(start, end, source) {
        if (!ion_ast_Position.is(start))
            throw new Error('start is not valid: ' + JSON.stringify(start));
        if (!ion_ast_Position.is(end))
            throw new Error('end is not valid: ' + JSON.stringify(end));
        if (!{ is: $ => ion_String.is($) && ($ === ion_String.trimmed($) && ion_String.length($) > 0 && ion_String.length($) < 200) }.is(source))
            throw new Error('source is not valid: ' + JSON.stringify(source));
        this.start = start;
        this.end = end;
        this.source = source;
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
const ion_Any = (Object.freeze({
    is(value) {
        return value !== void 0
    }
}));
const ion_Type = (Object.freeze({
    is(value) {
        return value != null && typeof value.is === 'function'
    }
}));
const ion_ast_Primitive = Object.freeze({ is: $ => ion_String.is($) || (ion_Number.is($) || ion_Boolean.is($)) });
const ion_ast_Property = Object.freeze(Object.assign(class Property {
    static create(...args) {
        let location, key, value;
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
        return new Property(location, key, value);
    }
    constructor(location, key, value) {
        if (!ion_ast_Location.is(location))
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
    static create(...args) {
        let location, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        return new Reference(location, name);
    }
    constructor(location, name) {
        if (!ion_ast_Location.is(location))
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
        'ion.ast.Expression',
        'ion.ast.Node',
        'ion.ast.Reference'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Reference')),
    path: 'ion.ast.Reference'
}));
const ion_ast_Statement = Object.freeze(Object.assign(class Statement {
    static create(...args) {
        let location;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
            }
        }
        return new Statement(location);
    }
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
const ion_ast_TypeExpression = Object.freeze(Object.assign(class TypeExpression {
    static create(...args) {
        let location;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
            }
        }
        return new TypeExpression(location);
    }
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
const ion_ast_TypeReference = Object.freeze(Object.assign(class TypeReference {
    static create(...args) {
        let location, name;
        for (let arg of args) {
            if (arg != null) {
                if (arg.location !== undefined)
                    location = arg.location;
                if (arg.name !== undefined)
                    name = arg.name;
            }
        }
        return new TypeReference(location, name);
    }
    constructor(location, name) {
        if (!ion_ast_Location.is(location))
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
    static create(...args) {
        let location, id, type, value, assignable;
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
        return new Variable(location, id, type, value, assignable);
    }
    constructor(location, id, type = null, value = null, assignable = false) {
        if (!ion_ast_Location.is(location))
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
const ion_ast_Parameter = Object.freeze(Object.assign(class Parameter {
    static create(...args) {
        let location, id, type, value, assignable;
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
        return new Parameter(location, id, type, value, assignable);
    }
    constructor(location, id, type = null, value = null, assignable = false) {
        if (!ion_ast_Location.is(location))
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
        if (arguments.length === 0)
            return emptyMap
        let map = new Map()
        for (let i = 0; i < arguments.length; i += 2) {
            // if arguments length is odd then last value will be null
            let key = arguments[i + 0]
            let value = arguments[i + 1]
            if (key === void 0)
                key = null
            if (value === void 0)
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
                for (let key of value.keys()) {
                    if (!KeyType.is(key))
                        return false
                }
                for (let value of value.values()) {
                    if (!ValueType.is(value))
                        return false
                }
            }
            return true
        }
    }))
})());
const ion_Integer = Object.freeze({ is: $ => ion_Number.is($) && ion_Number.fraction($) === 0 });
const ion_Array = ((function(){
    const emptyArray = Object.freeze([])
    return Object.freeze(Object.assign(function ion_Array(){
        return emptyArray
    }, {
        is(value, ValueType) {
            // TODO: Once calculated on an instance we could cache the result with a unique Symbol.
            if (!Array.isArray(value))
                return false
            for (let element of value) {
                if (!ValueType.is(element))
                    return false
            }
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
        Boolean: ion_Boolean,
        ast: Object.freeze({
            Node: ion_ast_Node,
            Declaration: ion_ast_Declaration,
            ClassDeclaration: ion_ast_ClassDeclaration,
            Expression: ion_ast_Expression,
            Argument: ion_ast_Argument,
            CallExpression: ion_ast_CallExpression,
            DotExpression: ion_ast_DotExpression,
            Id: ion_ast_Id,
            ImportStep: ion_ast_ImportStep,
            Literal: ion_ast_Literal,
            Position: ion_ast_Position,
            Module: ion_ast_Module,
            Location: ion_ast_Location,
            Primitive: ion_ast_Primitive,
            Property: ion_ast_Property,
            Reference: ion_ast_Reference,
            Statement: ion_ast_Statement,
            TypeExpression: ion_ast_TypeExpression,
            TypeReference: ion_ast_TypeReference,
            Variable: ion_ast_Variable,
            Parameter: ion_ast_Parameter
        }),
        String: ion_String,
        Number: ion_Number,
        Any: ion_Any,
        Type: ion_Type,
        Map: ion_Map,
        Integer: ion_Integer,
        Array: ion_Array,
        constants: Object.freeze({
            one: ion_constants_one,
            zero: ion_constants_zero,
            Baz: ion_constants_Baz
        })
    })
});
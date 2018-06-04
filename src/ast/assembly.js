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
const ion_ast_Node = Object.freeze(Object.assign(class Node {
    constructor(location = null) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        this.location = location;
        Object.freeze(this);
    }
}, {
    types: new Set(['ion.ast.Node']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Node')),
    path: 'ion.ast.Node'
}));
const ion_ast_Declaration = Object.freeze(Object.assign(class Declaration {
    constructor(location = null, id) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!ion_ast_Id.is(id))
            throw new Error('id is not valid: ' + id);
        this.location = location;
        this.id = id;
        Object.freeze(this);
    }
}, {
    types: new Set([
        'ion.ast.Node',
        'ion.ast.Declaration'
    ]),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Declaration')),
    path: 'ion.ast.Declaration'
}));
const ion_ast_Expression = Object.freeze(Object.assign(class Expression {
    constructor(location = null) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        this.location = location;
        Object.freeze(this);
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
    constructor(location = null, location = null, name = null, value) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_String.is($) || ion_Null.is($) }.is(name))
            throw new Error('name is not valid: ' + name);
        if (!ion_ast_Expression.is(value))
            throw new Error('value is not valid: ' + value);
        this.location = location;
        this.location = location;
        this.name = name;
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
    constructor(location = null, location = null, callee, arguments) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!ion_ast_Expression.is(callee))
            throw new Error('callee is not valid: ' + callee);
        if (!ion_Array.is(arguments, ion_ast_Argument))
            throw new Error('arguments is not valid: ' + arguments);
        this.location = location;
        this.location = location;
        this.callee = callee;
        this.arguments = arguments;
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
const ion_ast_Id = Object.freeze(Object.assign(class Id {
    constructor(location = null, location = null, name) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!ion_String.is(name))
            throw new Error('name is not valid: ' + name);
        this.location = location;
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
const ion_ast_Position = Object.freeze(Object.assign(class Position {
    constructor(line, column) {
        if (!{ is: $ => ion_Integer.is($) && $ >= 1 }.is(line))
            throw new Error('line is not valid: ' + line);
        if (!{ is: $ => ion_Integer.is($) && $ >= 0 }.is(column))
            throw new Error('column is not valid: ' + column);
        this.line = line;
        this.column = column;
        Object.freeze(this);
    }
}, {
    types: new Set(['ion.ast.Position']),
    is: ($ => $ != null && $.constructor.types != null && $.constructor.types.has('ion.ast.Position')),
    path: 'ion.ast.Position'
}));
const ion_ast_Location = Object.freeze(Object.assign(class Location {
    constructor(start, end, source) {
        if (!ion_ast_Position.is(start))
            throw new Error('start is not valid: ' + start);
        if (!ion_ast_Position.is(end))
            throw new Error('end is not valid: ' + end);
        if (!{ is: $ => ion_String.is($) && ($ === ion_String.trimmed($) && ion_String.length($) > 0 && ion_String.length($) < 200) }.is(source))
            throw new Error('source is not valid: ' + source);
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
const ion_ast_Reference = Object.freeze(Object.assign(class Reference {
    constructor(location = null, location = null, location = null, location = null, name) {
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!{ is: $ => ion_ast_Location.is($) || ion_Null.is($) }.is(location))
            throw new Error('location is not valid: ' + location);
        if (!ion_String.is(name))
            throw new Error('name is not valid: ' + name);
        this.location = location;
        this.location = location;
        this.location = location;
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
const ion_Type = (Object.freeze({
    is(value) {
        return value != null && typeof value.is === 'function'
    }
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
            for (let value of value.values()) {
                if (!ValueType.is(value))
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
        String: ion_String,
        ast: Object.freeze({
            Node: ion_ast_Node,
            Declaration: ion_ast_Declaration,
            Expression: ion_ast_Expression,
            Argument: ion_ast_Argument,
            CallExpression: ion_ast_CallExpression,
            Id: ion_ast_Id,
            Position: ion_ast_Position,
            Location: ion_ast_Location,
            Reference: ion_ast_Reference
        }),
        Map: ion_Map,
        Type: ion_Type,
        Number: ion_Number,
        Integer: ion_Integer,
        Array: ion_Array,
        constants: Object.freeze({
            one: ion_constants_one,
            zero: ion_constants_zero,
            Baz: ion_constants_Baz
        })
    })
});
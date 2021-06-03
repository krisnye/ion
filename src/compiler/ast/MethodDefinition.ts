/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Identifier from './Identifier';
import * as FunctionExpression from './FunctionExpression';
import * as String from './ion/String';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class MethodDefinition implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly key: Expression.Expression | Identifier.Identifier;
    readonly value: FunctionExpression.FunctionExpression;
    readonly kind: String.String;
    readonly computed: Boolean.Boolean;
    readonly static: Boolean.Boolean;
    static readonly id = 'MethodDefinition';
    static readonly implements = new Set([
        'MethodDefinition',
        'ion_Object',
        'Node'
    ]);
    constructor({
        location = null,
        key,
        value,
        kind = 'method',
        computed = false,
        static: _static = false
    }: {
        location?: Location.Location | Null.Null,
        key: Expression.Expression | Identifier.Identifier,
        value: FunctionExpression.FunctionExpression,
        kind?: String.String,
        computed?: Boolean.Boolean,
        static?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(key) || Identifier.isIdentifier(key)))
            throw new Error('key is not a Expression | Identifier: ' + Class.toString(key));
        if (!FunctionExpression.isFunctionExpression(value))
            throw new Error('value is not a FunctionExpression: ' + Class.toString(value));
        if (!String.isString(kind))
            throw new Error('kind is not a String: ' + Class.toString(kind));
        if (!Boolean.isBoolean(computed))
            throw new Error('computed is not a Boolean: ' + Class.toString(computed));
        if (!Boolean.isBoolean(_static))
            throw new Error('static is not a Boolean: ' + Class.toString(_static));
        this.location = location;
        this.key = key;
        this.value = value;
        this.kind = kind;
        this.computed = computed;
        this.static = _static;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        key?: Expression.Expression | Identifier.Identifier,
        value?: FunctionExpression.FunctionExpression,
        kind?: String.String,
        computed?: Boolean.Boolean,
        static?: Boolean.Boolean
    }) {
        return new MethodDefinition({
            ...this,
            ...properties
        });
    }
    static is(value): value is MethodDefinition {
        return isMethodDefinition(value);
    }
}
export function isMethodDefinition(value): value is MethodDefinition {
    return Class.isInstance(MethodDefinition, value);
}
export default MethodDefinition;
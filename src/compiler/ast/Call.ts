/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as ChainElement from './ChainElement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as Class from './ion/Class';
export class Call implements _Object.Object , Expression.Expression , ChainElement.ChainElement , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly optional: Boolean.Boolean;
    readonly new: Boolean.Boolean;
    readonly callee: Expression.Expression;
    readonly arguments: _Array.Array<Statement.Statement>;
    static readonly id = 'Call';
    static readonly implements = new Set([
        'Call',
        'ion_Object',
        'Expression',
        'ChainElement',
        'Typed',
        'Node'
    ]);
    constructor({
        $ = 0,
        location = null,
        type = null,
        optional = false,
        new: _new = false,
        callee,
        arguments: _arguments
    }: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        optional?: Boolean.Boolean,
        new?: Boolean.Boolean,
        callee: Expression.Expression,
        arguments: _Array.Array<Statement.Statement>
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(optional))
            throw new Error('optional is not a Boolean: ' + Class.toString(optional));
        if (!Boolean.isBoolean(_new))
            throw new Error('new is not a Boolean: ' + Class.toString(_new));
        if (!Expression.isExpression(callee))
            throw new Error('callee is not a Expression: ' + Class.toString(callee));
        if (!_Array.isArray(_arguments))
            throw new Error('arguments is not a Array: ' + Class.toString(_arguments));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.optional = optional;
        this.new = _new;
        this.callee = callee;
        this.arguments = _arguments;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        optional?: Boolean.Boolean,
        new?: Boolean.Boolean,
        callee?: Expression.Expression,
        arguments?: _Array.Array<Statement.Statement>
    }) {
        return new Call({
            ...this,
            ...properties
        });
    }
    static is(value): value is Call {
        return isCall(value);
    }
}
export function isCall(value): value is Call {
    return Class.isInstance(Call, value);
}
export default Call;
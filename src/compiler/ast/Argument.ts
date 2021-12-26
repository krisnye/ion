/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Meta from './Meta';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Call from './Call';
import * as Property from './Property';
import * as Identifier from './Identifier';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class Argument implements _Object.Object , Meta.Meta , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Call.Call | Property.Property> | Null.Null;
    readonly id: Identifier.Identifier | Null.Null;
    readonly value: Expression.Expression;
    static readonly id = 'Argument';
    static readonly implements = new Set([
        'Argument',
        'ion_Object',
        'Meta',
        'Node'
    ]);
    constructor({location = null, meta = null, id = null, value}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Call.Call | Property.Property> | Null.Null,
        id?: Identifier.Identifier | Null.Null,
        value: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!(Identifier.isIdentifier(id) || Null.isNull(id)))
            throw new Error('id is not a Identifier | Null: ' + Class.toString(id));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.location = location;
        this.meta = meta;
        this.id = id;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Call.Call | Property.Property> | Null.Null,
        id?: Identifier.Identifier | Null.Null,
        value?: Expression.Expression
    }) {
        return new Argument({
            ...this,
            ...properties
        });
    }
    static is(value): value is Argument {
        return isArgument(value);
    }
}
export function isArgument(value): value is Argument {
    return Class.isInstance(Argument, value);
}
export default Argument;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Return implements _Object.Object , Statement.Statement , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly value: Expression.Expression | Null.Null;
    static readonly id = 'Return';
    static readonly implements = new Set([
        'Return',
        'ion_Object',
        'Statement',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, value = null}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Expression.isExpression(value) || Null.isNull(value)))
            throw new Error('value is not a Expression | Null: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value?: Expression.Expression | Null.Null
    }) {
        return new Return({
            ...this,
            ...properties
        });
    }
    static is(value): value is Return {
        return isReturn(value);
    }
}
export function isReturn(value): value is Return {
    return Class.isInstance(Return, value);
}
export default Return;
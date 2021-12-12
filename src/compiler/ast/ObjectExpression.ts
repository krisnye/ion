/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Block from './Block';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as Class from './ion/Class';
export class ObjectExpression implements _Object.Object , Block.Block , Expression.Expression , Scope.Scope , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly body: _Array.Array<Statement.Statement>;
    static readonly id = 'ObjectExpression';
    static readonly implements = new Set([
        'ObjectExpression',
        'ion_Object',
        'Block',
        'Expression',
        'Scope',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, body}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        body: _Array.Array<Statement.Statement>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        body?: _Array.Array<Statement.Statement>
    }) {
        return new ObjectExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is ObjectExpression {
        return isObjectExpression(value);
    }
}
export function isObjectExpression(value): value is ObjectExpression {
    return Class.isInstance(ObjectExpression, value);
}
export default ObjectExpression;
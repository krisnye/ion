/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Block from './Block';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class OutlineOperation implements _Object.Object , Block.Block , Expression.Expression , Scope.Scope , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly body: _Array.Array<Statement.Statement>;
    readonly operator: String.String;
    static readonly id = 'OutlineOperation';
    static readonly implements = new Set([
        'OutlineOperation',
        'ion_Object',
        'Block',
        'Expression',
        'Scope',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, body, operator}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        body: _Array.Array<Statement.Statement>,
        operator: String.String
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        if (!String.isString(operator))
            throw new Error('operator is not a String: ' + Class.toString(operator));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.body = body;
        this.operator = operator;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        body?: _Array.Array<Statement.Statement>,
        operator?: String.String
    }) {
        return new OutlineOperation({
            ...this,
            ...properties
        });
    }
    static is(value): value is OutlineOperation {
        return isOutlineOperation(value);
    }
}
export function isOutlineOperation(value): value is OutlineOperation {
    return Class.isInstance(OutlineOperation, value);
}
export default OutlineOperation;
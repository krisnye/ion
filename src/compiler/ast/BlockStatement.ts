/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Scope from './Scope';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class BlockStatement implements _Object.Object , Statement.Statement , Scope.Scope , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly body: _Array.Array<Statement.Statement>;
    static readonly id = 'BlockStatement';
    static readonly implements = new Set([
        'BlockStatement',
        'ion_Object',
        'Statement',
        'Scope',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, body}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        body: _Array.Array<Statement.Statement>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        body?: _Array.Array<Statement.Statement>
    }) {
        return new BlockStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is BlockStatement {
        return isBlockStatement(value);
    }
}
export function isBlockStatement(value): value is BlockStatement {
    return Class.isInstance(BlockStatement, value);
}
export default BlockStatement;
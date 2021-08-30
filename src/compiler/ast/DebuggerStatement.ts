/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class DebuggerStatement implements _Object.Object , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    static readonly id = 'DebuggerStatement';
    static readonly implements = new Set([
        'DebuggerStatement',
        'ion_Object',
        'Statement',
        'Node'
    ]);
    constructor({
        location = null
    }: { location?: Location.Location | Null.Null }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        this.location = location;
        Object.freeze(this);
    }
    patch(properties: { location?: Location.Location | Null.Null }) {
        return new DebuggerStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is DebuggerStatement {
        return isDebuggerStatement(value);
    }
}
export function isDebuggerStatement(value): value is DebuggerStatement {
    return Class.isInstance(DebuggerStatement, value);
}
export default DebuggerStatement;
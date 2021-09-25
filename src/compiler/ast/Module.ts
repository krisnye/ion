/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Scope from './Scope';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class Module implements _Object.Object , Node.Node , Scope.Scope {
    readonly location: Location.Location | Null.Null;
    readonly body: _Array.Array<Statement.Statement>;
    readonly name: String.String;
    static readonly id = 'Module';
    static readonly implements = new Set([
        'Module',
        'ion_Object',
        'Node',
        'Scope'
    ]);
    constructor({location = null, body, name = ''}: {
        location?: Location.Location | Null.Null,
        body: _Array.Array<Statement.Statement>,
        name?: String.String
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        this.location = location;
        this.body = body;
        this.name = name;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        body?: _Array.Array<Statement.Statement>,
        name?: String.String
    }) {
        return new Module({
            ...this,
            ...properties
        });
    }
    static is(value): value is Module {
        return isModule(value);
    }
}
export function isModule(value): value is Module {
    return Class.isInstance(Module, value);
}
export default Module;
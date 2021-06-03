/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declarator from './Declarator';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class File implements _Object.Object , Scope.Scope , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly id: Declarator.Declarator;
    readonly body: _Array.Array<Statement.Statement | Expression.Expression>;
    static readonly id = 'File';
    static readonly implements = new Set([
        'File',
        'ion_Object',
        'Scope',
        'Node'
    ]);
    constructor({location = null, id, body}: {
        location?: Location.Location | Null.Null,
        id: Declarator.Declarator,
        body: _Array.Array<Statement.Statement | Expression.Expression>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        this.location = location;
        this.id = id;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        id?: Declarator.Declarator,
        body?: _Array.Array<Statement.Statement | Expression.Expression>
    }) {
        return new File({
            ...this,
            ...properties
        });
    }
    static is(value): value is File {
        return isFile(value);
    }
}
export function isFile(value): value is File {
    return Class.isInstance(File, value);
}
export default File;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Block from './Block';
import * as Scope from './Scope';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as Class from './ion/Class';
export class File implements _Object.Object , Block.Block , Scope.Scope , Expression.Expression , Node.Node , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly body: _Array.Array<Statement.Statement>;
    static readonly id = 'File';
    static readonly implements = new Set([
        'File',
        'ion_Object',
        'Block',
        'Scope',
        'Expression',
        'Node',
        'Typed'
    ]);
    constructor({location = null, type = null, body}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        body: _Array.Array<Statement.Statement>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        body?: _Array.Array<Statement.Statement>
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
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Reference from './Reference';
import * as Id from './Id';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as TypeDefinition from './TypeDefinition';
import * as Class from './ion/Class';
export class DotExpression implements _Object.Object , Reference.Reference , Id.Id , Expression.Expression , Node.Node , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    static readonly id = 'DotExpression';
    static readonly implements = new Set([
        'DotExpression',
        'ion_Object',
        'Reference',
        'Id',
        'Expression',
        'Node',
        'Typed'
    ]);
    constructor({location = null, name = '.', type = null}: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null)
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        this.location = location;
        this.name = name;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null)
    }) {
        return new DotExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is DotExpression {
        return isDotExpression(value);
    }
}
export function isDotExpression(value): value is DotExpression {
    return Class.isInstance(DotExpression, value);
}
export default DotExpression;
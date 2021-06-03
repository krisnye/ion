/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as TypeDefinition from './TypeDefinition';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Reference from './Reference';
import * as Class from './ion/Class';
export class TypeExpression implements _Object.Object , TypeDefinition.TypeDefinition , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly value: Expression.Expression;
    static readonly id = 'TypeExpression';
    static readonly implements = new Set([
        'TypeExpression',
        'ion_Object',
        'TypeDefinition',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, value}: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        value: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        value?: Expression.Expression
    }) {
        return new TypeExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is TypeExpression {
        return isTypeExpression(value);
    }
}
export function isTypeExpression(value): value is TypeExpression {
    return Class.isInstance(TypeExpression, value);
}
export default TypeExpression;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as _Array from './ion/Array';
import * as SpreadElement from './SpreadElement';
import * as Statement from './Statement';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class ArrayExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly elements: _Array.Array<Expression.Expression | (SpreadElement.SpreadElement | (Statement.Statement | Null.Null))>;
    readonly isSet: Boolean.Boolean;
    static readonly id = 'ArrayExpression';
    static readonly implements = new Set([
        'ArrayExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, elements, isSet = false}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        elements: _Array.Array<Expression.Expression | (SpreadElement.SpreadElement | (Statement.Statement | Null.Null))>,
        isSet?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!_Array.isArray(elements))
            throw new Error('elements is not a Array: ' + Class.toString(elements));
        if (!Boolean.isBoolean(isSet))
            throw new Error('isSet is not a Boolean: ' + Class.toString(isSet));
        this.location = location;
        this.type = type;
        this.elements = elements;
        this.isSet = isSet;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        elements?: _Array.Array<Expression.Expression | (SpreadElement.SpreadElement | (Statement.Statement | Null.Null))>,
        isSet?: Boolean.Boolean
    }) {
        return new ArrayExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is ArrayExpression {
        return isArrayExpression(value);
    }
}
export function isArrayExpression(value): value is ArrayExpression {
    return Class.isInstance(ArrayExpression, value);
}
export default ArrayExpression;
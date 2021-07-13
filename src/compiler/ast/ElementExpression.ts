/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as SpreadElement from './SpreadElement';
import * as Statement from './Statement';
import * as Class from './ion/Class';
export class ElementExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly kind: Expression.Expression;
    readonly close: Expression.Expression | Null.Null;
    readonly properties: _Array.Array<Property.Property | SpreadElement.SpreadElement>;
    readonly children: _Array.Array<Expression.Expression | (SpreadElement.SpreadElement | Statement.Statement)>;
    static readonly id = 'ElementExpression';
    static readonly implements = new Set([
        'ElementExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, kind, close = null, properties, children}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        kind: Expression.Expression,
        close?: Expression.Expression | Null.Null,
        properties: _Array.Array<Property.Property | SpreadElement.SpreadElement>,
        children: _Array.Array<Expression.Expression | (SpreadElement.SpreadElement | Statement.Statement)>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Expression.isExpression(kind))
            throw new Error('kind is not a Expression: ' + Class.toString(kind));
        if (!(Expression.isExpression(close) || Null.isNull(close)))
            throw new Error('close is not a Expression | Null: ' + Class.toString(close));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        if (!_Array.isArray(children))
            throw new Error('children is not a Array: ' + Class.toString(children));
        this.location = location;
        this.type = type;
        this.kind = kind;
        this.close = close;
        this.properties = properties;
        this.children = children;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        kind?: Expression.Expression,
        close?: Expression.Expression | Null.Null,
        properties?: _Array.Array<Property.Property | SpreadElement.SpreadElement>,
        children?: _Array.Array<Expression.Expression | (SpreadElement.SpreadElement | Statement.Statement)>
    }) {
        return new ElementExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is ElementExpression {
        return isElementExpression(value);
    }
}
export function isElementExpression(value): value is ElementExpression {
    return Class.isInstance(ElementExpression, value);
}
export default ElementExpression;
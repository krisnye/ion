/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as TemplateElement from './TemplateElement';
import * as Class from './ion/Class';
export class TemplateLiteral implements _Object.Object , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly quasis: _Array.Array<TemplateElement.TemplateElement>;
    readonly expressions: _Array.Array<Expression.Expression>;
    static readonly id = 'TemplateLiteral';
    static readonly implements = new Set([
        'TemplateLiteral',
        'ion_Object',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, quasis, expressions}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        quasis: _Array.Array<TemplateElement.TemplateElement>,
        expressions: _Array.Array<Expression.Expression>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(quasis))
            throw new Error('quasis is not a Array: ' + Class.toString(quasis));
        if (!_Array.isArray(expressions))
            throw new Error('expressions is not a Array: ' + Class.toString(expressions));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.quasis = quasis;
        this.expressions = expressions;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        quasis?: _Array.Array<TemplateElement.TemplateElement>,
        expressions?: _Array.Array<Expression.Expression>
    }) {
        return new TemplateLiteral({
            ...this,
            ...properties
        });
    }
    static is(value): value is TemplateLiteral {
        return isTemplateLiteral(value);
    }
}
export function isTemplateLiteral(value): value is TemplateLiteral {
    return Class.isInstance(TemplateLiteral, value);
}
export default TemplateLiteral;
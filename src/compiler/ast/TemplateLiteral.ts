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
import * as TemplateElement from './TemplateElement';
import * as Class from './ion/Class';
export class TemplateLiteral implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly quasis: _Array.Array<TemplateElement.TemplateElement>;
    readonly expressions: _Array.Array<Expression.Expression>;
    static readonly id = 'TemplateLiteral';
    static readonly implements = new Set([
        'TemplateLiteral',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, quasis, expressions}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        quasis: _Array.Array<TemplateElement.TemplateElement>,
        expressions: _Array.Array<Expression.Expression>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!_Array.isArray(quasis))
            throw new Error('quasis is not a Array: ' + Class.toString(quasis));
        if (!_Array.isArray(expressions))
            throw new Error('expressions is not a Array: ' + Class.toString(expressions));
        this.location = location;
        this.type = type;
        this.quasis = quasis;
        this.expressions = expressions;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
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
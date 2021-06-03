/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class Variable implements _Object.Object , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly id: Pattern.Pattern | Expression.Expression;
    readonly value: Expression.Expression | Null.Null;
    static readonly id = 'Variable';
    static readonly implements = new Set([
        'Variable',
        'ion_Object',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, id, value = null}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        id: Pattern.Pattern | Expression.Expression,
        value?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!(Pattern.isPattern(id) || Expression.isExpression(id)))
            throw new Error('id is not a Pattern | Expression: ' + Class.toString(id));
        if (!(Expression.isExpression(value) || Null.isNull(value)))
            throw new Error('value is not a Expression | Null: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.id = id;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        id?: Pattern.Pattern | Expression.Expression,
        value?: Expression.Expression | Null.Null
    }) {
        return new Variable({
            ...this,
            ...properties
        });
    }
    static is(value): value is Variable {
        return isVariable(value);
    }
}
export function isVariable(value): value is Variable {
    return Class.isInstance(Variable, value);
}
export default Variable;
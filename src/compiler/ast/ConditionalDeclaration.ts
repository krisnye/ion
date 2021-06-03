/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as VariableDeclaration from './VariableDeclaration';
import * as Meta from './Meta';
import * as Variable from './Variable';
import * as Declaration from './Declaration';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Statement from './Statement';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Type from './Type';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class ConditionalDeclaration implements _Object.Object , VariableDeclaration.VariableDeclaration , Meta.Meta , Variable.Variable , Declaration.Declaration , Node.Node , Typed.Typed , Statement.Statement {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly id: Pattern.Pattern | Expression.Expression;
    readonly value: Expression.Expression | Null.Null;
    readonly negate: Boolean.Boolean;
    static readonly id = 'ConditionalDeclaration';
    static readonly implements = new Set([
        'ConditionalDeclaration',
        'ion_Object',
        'VariableDeclaration',
        'Meta',
        'Variable',
        'Declaration',
        'Node',
        'Typed',
        'Statement'
    ]);
    constructor({location = null, meta = null, type = null, id, value = null, negate = false}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Type.Type | Null.Null,
        id: Pattern.Pattern | Expression.Expression,
        value?: Expression.Expression | Null.Null,
        negate?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!(Pattern.isPattern(id) || Expression.isExpression(id)))
            throw new Error('id is not a Pattern | Expression: ' + Class.toString(id));
        if (!(Expression.isExpression(value) || Null.isNull(value)))
            throw new Error('value is not a Expression | Null: ' + Class.toString(value));
        if (!Boolean.isBoolean(negate))
            throw new Error('negate is not a Boolean: ' + Class.toString(negate));
        this.location = location;
        this.meta = meta;
        this.type = type;
        this.id = id;
        this.value = value;
        this.negate = negate;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Type.Type | Null.Null,
        id?: Pattern.Pattern | Expression.Expression,
        value?: Expression.Expression | Null.Null,
        negate?: Boolean.Boolean
    }) {
        return new ConditionalDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is ConditionalDeclaration {
        return isConditionalDeclaration(value);
    }
}
export function isConditionalDeclaration(value): value is ConditionalDeclaration {
    return Class.isInstance(ConditionalDeclaration, value);
}
export default ConditionalDeclaration;
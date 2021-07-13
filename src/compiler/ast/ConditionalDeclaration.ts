/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as VariableDeclaration from './VariableDeclaration';
import * as Variable from './Variable';
import * as Declaration from './Declaration';
import * as Meta from './Meta';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Statement from './Statement';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Expression from './Expression';
import * as Pattern from './Pattern';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class ConditionalDeclaration implements _Object.Object , VariableDeclaration.VariableDeclaration , Variable.Variable , Declaration.Declaration , Meta.Meta , Typed.Typed , Node.Node , Statement.Statement {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Pattern.Pattern;
    readonly value: Expression.Expression | Null.Null;
    readonly negate: Boolean.Boolean;
    static readonly id = 'ConditionalDeclaration';
    static readonly implements = new Set([
        'ConditionalDeclaration',
        'ion_Object',
        'VariableDeclaration',
        'Variable',
        'Declaration',
        'Meta',
        'Typed',
        'Node',
        'Statement'
    ]);
    constructor({location = null, meta = null, type = null, id, value = null, negate = false}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Expression.Expression | Null.Null,
        id: Pattern.Pattern,
        value?: Expression.Expression | Null.Null,
        negate?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Pattern.isPattern(id))
            throw new Error('id is not a Pattern: ' + Class.toString(id));
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
        type?: Expression.Expression | Null.Null,
        id?: Pattern.Pattern,
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
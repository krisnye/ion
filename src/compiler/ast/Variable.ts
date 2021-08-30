/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Meta from './Meta';
import * as Declaration from './Declaration';
import * as Node from './Node';
import * as Statement from './Statement';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Declarator from './Declarator';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class Variable implements _Object.Object , Meta.Meta , Declaration.Declaration , Node.Node , Statement.Statement {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    readonly id: Declarator.Declarator;
    readonly value: Expression.Expression | Null.Null;
    static readonly id = 'Variable';
    static readonly implements = new Set([
        'Variable',
        'ion_Object',
        'Meta',
        'Declaration',
        'Node',
        'Statement'
    ]);
    constructor({location = null, meta = null, id, value = null}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        id: Declarator.Declarator,
        value?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!(Expression.isExpression(value) || Null.isNull(value)))
            throw new Error('value is not a Expression | Null: ' + Class.toString(value));
        this.location = location;
        this.meta = meta;
        this.id = id;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        id?: Declarator.Declarator,
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
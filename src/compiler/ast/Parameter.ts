/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Variable from './Variable';
import * as Declaration from './Declaration';
import * as Meta from './Meta';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Statement from './Statement';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Expression from './Expression';
import * as Pattern from './Pattern';
import * as Class from './ion/Class';
export class Parameter implements _Object.Object , Variable.Variable , Declaration.Declaration , Meta.Meta , Typed.Typed , Node.Node , Statement.Statement {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Pattern.Pattern;
    readonly value: Expression.Expression | Null.Null;
    static readonly id = 'Parameter';
    static readonly implements = new Set([
        'Parameter',
        'ion_Object',
        'Variable',
        'Declaration',
        'Meta',
        'Typed',
        'Node',
        'Statement'
    ]);
    constructor({$ = 0, location = null, meta = null, type = null, id, value = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Expression.Expression | Null.Null,
        id: Pattern.Pattern,
        value?: Expression.Expression | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
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
        this.$ = $;
        this.location = location;
        this.meta = meta;
        this.type = type;
        this.id = id;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Pattern.Pattern,
        value?: Expression.Expression | Null.Null
    }) {
        return new Parameter({
            ...this,
            ...properties
        });
    }
    static is(value): value is Parameter {
        return isParameter(value);
    }
}
export function isParameter(value): value is Parameter {
    return Class.isInstance(Parameter, value);
}
export default Parameter;
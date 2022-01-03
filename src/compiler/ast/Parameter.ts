/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Variable from './Variable';
import * as Meta from './Meta';
import * as Expression from './Expression';
import * as Declaration from './Declaration';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Statement from './Statement';
import * as SideEffect from './SideEffect';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Call from './Call';
import * as Property from './Property';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as Pattern from './Pattern';
import * as Identifier from './Identifier';
import * as Number from './ion/Number';
import * as Class from './ion/Class';
export class Parameter implements _Object.Object , Variable.Variable , Meta.Meta , Expression.Expression , Declaration.Declaration , Node.Node , Typed.Typed , Statement.Statement , SideEffect.SideEffect {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Call.Call | Property.Property> | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly id: Pattern.Pattern | (Identifier.Identifier | Expression.Expression);
    readonly isMutable: Boolean.Boolean;
    readonly value: Expression.Expression | Null.Null;
    readonly isType: Boolean.Boolean;
    readonly isMeta: Boolean.Boolean;
    readonly isInstance: Boolean.Boolean;
    readonly isStatic: Boolean.Boolean;
    readonly typeParameterIndex: Number.Number | Null.Null;
    static readonly id = 'Parameter';
    static readonly implements = new Set([
        'Parameter',
        'ion_Object',
        'Variable',
        'Meta',
        'Expression',
        'Declaration',
        'Node',
        'Typed',
        'Statement',
        'SideEffect'
    ]);
    constructor({location = null, meta = null, type = null, resolved = false, id, isMutable = false, value = null, isType = false, isMeta = false, isInstance = false, isStatic = false, typeParameterIndex = null}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Call.Call | Property.Property> | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        id: Pattern.Pattern | (Identifier.Identifier | Expression.Expression),
        isMutable?: Boolean.Boolean,
        value?: Expression.Expression | Null.Null,
        isType?: Boolean.Boolean,
        isMeta?: Boolean.Boolean,
        isInstance?: Boolean.Boolean,
        isStatic?: Boolean.Boolean,
        typeParameterIndex?: Number.Number | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!(Pattern.isPattern(id) || (Identifier.isIdentifier(id) || Expression.isExpression(id))))
            throw new Error('id is not a Pattern | Identifier | Expression: ' + Class.toString(id));
        if (!Boolean.isBoolean(isMutable))
            throw new Error('isMutable is not a Boolean: ' + Class.toString(isMutable));
        if (!(Expression.isExpression(value) || Null.isNull(value)))
            throw new Error('value is not a Expression | Null: ' + Class.toString(value));
        if (!Boolean.isBoolean(isType))
            throw new Error('isType is not a Boolean: ' + Class.toString(isType));
        if (!Boolean.isBoolean(isMeta))
            throw new Error('isMeta is not a Boolean: ' + Class.toString(isMeta));
        if (!Boolean.isBoolean(isInstance))
            throw new Error('isInstance is not a Boolean: ' + Class.toString(isInstance));
        if (!Boolean.isBoolean(isStatic))
            throw new Error('isStatic is not a Boolean: ' + Class.toString(isStatic));
        if (!(Number.isNumber(typeParameterIndex) || Null.isNull(typeParameterIndex)))
            throw new Error('typeParameterIndex is not a Number | Null: ' + Class.toString(typeParameterIndex));
        this.location = location;
        this.meta = meta;
        this.type = type;
        this.resolved = resolved;
        this.id = id;
        this.isMutable = isMutable;
        this.value = value;
        this.isType = isType;
        this.isMeta = isMeta;
        this.isInstance = isInstance;
        this.isStatic = isStatic;
        this.typeParameterIndex = typeParameterIndex;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Call.Call | Property.Property> | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        id?: Pattern.Pattern | (Identifier.Identifier | Expression.Expression),
        isMutable?: Boolean.Boolean,
        value?: Expression.Expression | Null.Null,
        isType?: Boolean.Boolean,
        isMeta?: Boolean.Boolean,
        isInstance?: Boolean.Boolean,
        isStatic?: Boolean.Boolean,
        typeParameterIndex?: Number.Number | Null.Null
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
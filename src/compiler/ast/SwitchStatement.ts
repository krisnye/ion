/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Expression from './Expression';
import * as _Array from './ion/Array';
import * as SwitchCase from './SwitchCase';
import * as Class from './ion/Class';
export class SwitchStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly discriminant: Expression.Expression;
    readonly cases: _Array.Array<SwitchCase.SwitchCase>;
    static readonly id = 'SwitchStatement';
    static readonly implements = new Set([
        'SwitchStatement',
        'ion_Object',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, discriminant, cases}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        discriminant: Expression.Expression,
        cases: _Array.Array<SwitchCase.SwitchCase>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Expression.isExpression(discriminant))
            throw new Error('discriminant is not a Expression: ' + Class.toString(discriminant));
        if (!_Array.isArray(cases))
            throw new Error('cases is not a Array: ' + Class.toString(cases));
        this.location = location;
        this.type = type;
        this.discriminant = discriminant;
        this.cases = cases;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        discriminant?: Expression.Expression,
        cases?: _Array.Array<SwitchCase.SwitchCase>
    }) {
        return new SwitchStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is SwitchStatement {
        return isSwitchStatement(value);
    }
}
export function isSwitchStatement(value): value is SwitchStatement {
    return Class.isInstance(SwitchStatement, value);
}
export default SwitchStatement;
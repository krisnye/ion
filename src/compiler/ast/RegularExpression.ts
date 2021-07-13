/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Type from './Type';
import * as RuntimeType from './RuntimeType';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class RegularExpression implements _Object.Object , Expression.Expression , Type.Type , RuntimeType.RuntimeType , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly pattern: String.String;
    readonly flags: String.String;
    static readonly id = 'RegularExpression';
    static readonly implements = new Set([
        'RegularExpression',
        'ion_Object',
        'Expression',
        'Type',
        'RuntimeType',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, pattern, flags}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        pattern: String.String,
        flags: String.String
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!String.isString(pattern))
            throw new Error('pattern is not a String: ' + Class.toString(pattern));
        if (!String.isString(flags))
            throw new Error('flags is not a String: ' + Class.toString(flags));
        this.location = location;
        this.type = type;
        this.pattern = pattern;
        this.flags = flags;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        pattern?: String.String,
        flags?: String.String
    }) {
        return new RegularExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is RegularExpression {
        return isRegularExpression(value);
    }
}
export function isRegularExpression(value): value is RegularExpression {
    return Class.isInstance(RegularExpression, value);
}
export default RegularExpression;
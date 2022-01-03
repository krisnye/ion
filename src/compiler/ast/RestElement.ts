/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class RestElement implements _Object.Object , Pattern.Pattern , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly value: Declarator.Declarator;
    static readonly id = 'RestElement';
    static readonly implements = new Set([
        'RestElement',
        'ion_Object',
        'Pattern',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, value}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        value: Declarator.Declarator
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!Declarator.isDeclarator(value))
            throw new Error('value is not a Declarator: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        value?: Declarator.Declarator
    }) {
        return new RestElement({
            ...this,
            ...properties
        });
    }
    static is(value): value is RestElement {
        return isRestElement(value);
    }
}
export function isRestElement(value): value is RestElement {
    return Class.isInstance(RestElement, value);
}
export default RestElement;
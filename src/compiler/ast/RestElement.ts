/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class RestElement implements _Object.Object , Pattern.Pattern , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly argument: Declarator.Declarator;
    static readonly id = 'RestElement';
    static readonly implements = new Set([
        'RestElement',
        'ion_Object',
        'Pattern',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, argument}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        argument: Declarator.Declarator
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Declarator.isDeclarator(argument))
            throw new Error('argument is not a Declarator: ' + Class.toString(argument));
        this.location = location;
        this.type = type;
        this.argument = argument;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        argument?: Declarator.Declarator
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
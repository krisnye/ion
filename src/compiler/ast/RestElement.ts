/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class RestElement implements _Object.Object , Pattern.Pattern , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly value: Declarator.Declarator;
    static readonly id = 'RestElement';
    static readonly implements = new Set([
        'RestElement',
        'ion_Object',
        'Pattern',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, value}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value: Declarator.Declarator
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Declarator.isDeclarator(value))
            throw new Error('value is not a Declarator: ' + Class.toString(value));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
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
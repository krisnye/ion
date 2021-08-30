/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class RestElement implements _Object.Object , Pattern.Pattern , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly value: Declarator.Declarator;
    static readonly id = 'RestElement';
    static readonly implements = new Set([
        'RestElement',
        'ion_Object',
        'Pattern',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, value}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value: Declarator.Declarator
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Declarator.isDeclarator(value))
            throw new Error('value is not a Declarator: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
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
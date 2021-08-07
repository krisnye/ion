/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class TemplateElement implements _Object.Object , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly valueRaw: String.String;
    readonly valueCooked: String.String;
    readonly tail: Boolean.Boolean;
    static readonly id = 'TemplateElement';
    static readonly implements = new Set([
        'TemplateElement',
        'ion_Object',
        'Node'
    ]);
    constructor({$ = 0, location = null, valueRaw = '', valueCooked = '', tail = false}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        valueRaw?: String.String,
        valueCooked?: String.String,
        tail?: Boolean.Boolean
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(valueRaw))
            throw new Error('valueRaw is not a String: ' + Class.toString(valueRaw));
        if (!String.isString(valueCooked))
            throw new Error('valueCooked is not a String: ' + Class.toString(valueCooked));
        if (!Boolean.isBoolean(tail))
            throw new Error('tail is not a Boolean: ' + Class.toString(tail));
        this.$ = $;
        this.location = location;
        this.valueRaw = valueRaw;
        this.valueCooked = valueCooked;
        this.tail = tail;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        valueRaw?: String.String,
        valueCooked?: String.String,
        tail?: Boolean.Boolean
    }) {
        return new TemplateElement({
            ...this,
            ...properties
        });
    }
    static is(value): value is TemplateElement {
        return isTemplateElement(value);
    }
}
export function isTemplateElement(value): value is TemplateElement {
    return Class.isInstance(TemplateElement, value);
}
export default TemplateElement;
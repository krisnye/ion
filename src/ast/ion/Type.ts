/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './Object';
import * as String from './String';
import * as Class from './Class';
export class Type implements _Object.Object {
    readonly id: String.String;
    static readonly id = 'ion_Type';
    static readonly implements = new Set([
        'ion_Type',
        'ion_Object'
    ]);
    constructor({id}: { id: String.String }) {
        if (!String.isString(id))
            throw new Error('id is not a String: ' + Class.toString(id));
        this.id = id;
        Object.freeze(this);
    }
    patch(properties: { id?: String.String }) {
        return new Type({
            ...this,
            ...properties
        });
    }
    static is(value): value is Type {
        return isType(value);
    }
}
export function isType(value): value is Type {
    return Class.isInstance(Type, value);
}
export default Type;
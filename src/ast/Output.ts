/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Map from './ion/Map';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class Output implements _Object.Object {
    readonly files: Map.Map<String.String, _Object.Object | String.String>;
    static readonly id = 'Output';
    static readonly implements = new Set([
        'Output',
        'ion_Object'
    ]);
    constructor({files}: { files: Map.Map<String.String, _Object.Object | String.String> }) {
        if (!Map.isMap(files))
            throw new Error('files is not a Map: ' + Class.toString(files));
        this.files = files;
        Object.freeze(this);
    }
    patch(properties: { files?: Map.Map<String.String, _Object.Object | String.String> }) {
        return new Output({
            ...this,
            ...properties
        });
    }
    static is(value): value is Output {
        return isOutput(value);
    }
}
export function isOutput(value): value is Output {
    return Class.isInstance(Output, value);
}
export default Output;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Position from './Position';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class Location implements _Object.Object {
    readonly start: Position.Position;
    readonly end: Position.Position;
    readonly filename: String.String;
    static readonly id = 'Location';
    static readonly implements = new Set([
        'Location',
        'ion_Object'
    ]);
    constructor({start, end, filename}: {
        start: Position.Position,
        end: Position.Position,
        filename: String.String
    }) {
        if (!Position.isPosition(start))
            throw new Error('start is not a Position: ' + Class.toString(start));
        if (!Position.isPosition(end))
            throw new Error('end is not a Position: ' + Class.toString(end));
        if (!String.isString(filename))
            throw new Error('filename is not a String: ' + Class.toString(filename));
        this.start = start;
        this.end = end;
        this.filename = filename;
        Object.freeze(this);
    }
    patch(properties: {
        start?: Position.Position,
        end?: Position.Position,
        filename?: String.String
    }) {
        return new Location({
            ...this,
            ...properties
        });
    }
    static is(value): value is Location {
        return isLocation(value);
    }
}
export function isLocation(value): value is Location {
    return Class.isInstance(Location, value);
}
export default Location;
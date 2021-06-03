/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Number from './ion/Number';
import * as Class from './ion/Class';
export class Position implements _Object.Object {
    readonly line: Number.Number;
    readonly column: Number.Number;
    static readonly id = 'Position';
    static readonly implements = new Set([
        'Position',
        'ion_Object'
    ]);
    constructor(line: Number.Number, column: Number.Number) {
        if (!Number.isNumber(line))
            throw new Error('line is not a Number: ' + Class.toString(line));
        if (!Number.isNumber(column))
            throw new Error('column is not a Number: ' + Class.toString(column));
        this.line = line;
        this.column = column;
        Object.freeze(this);
    }
    static is(value): value is Position {
        return isPosition(value);
    }
}
export function isPosition(value): value is Position {
    return Class.isInstance(Position, value);
}
export default Position;
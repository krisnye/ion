/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Identifier from './Identifier';
import * as Class from './ion/Class';
export class ExportSpecifier implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly exported: Identifier.Identifier;
    readonly local: Identifier.Identifier;
    static readonly id = 'ExportSpecifier';
    static readonly implements = new Set([
        'ExportSpecifier',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, exported, local}: {
        location?: Location.Location | Null.Null,
        exported: Identifier.Identifier,
        local: Identifier.Identifier
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Identifier.isIdentifier(exported))
            throw new Error('exported is not a Identifier: ' + Class.toString(exported));
        if (!Identifier.isIdentifier(local))
            throw new Error('local is not a Identifier: ' + Class.toString(local));
        this.location = location;
        this.exported = exported;
        this.local = local;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        exported?: Identifier.Identifier,
        local?: Identifier.Identifier
    }) {
        return new ExportSpecifier({
            ...this,
            ...properties
        });
    }
    static is(value): value is ExportSpecifier {
        return isExportSpecifier(value);
    }
}
export function isExportSpecifier(value): value is ExportSpecifier {
    return Class.isInstance(ExportSpecifier, value);
}
export default ExportSpecifier;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as ModuleSpecifier from './ModuleSpecifier';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declarator from './Declarator';
import * as Identifier from './Identifier';
import * as Class from './ion/Class';
export class ImportSpecifier implements _Object.Object , ModuleSpecifier.ModuleSpecifier , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly local: Declarator.Declarator;
    readonly imported: Identifier.Identifier;
    static readonly id = 'ImportSpecifier';
    static readonly implements = new Set([
        'ImportSpecifier',
        'ion_Object',
        'ModuleSpecifier',
        'Node'
    ]);
    constructor({location = null, local, imported}: {
        location?: Location.Location | Null.Null,
        local: Declarator.Declarator,
        imported: Identifier.Identifier
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Declarator.isDeclarator(local))
            throw new Error('local is not a Declarator: ' + Class.toString(local));
        if (!Identifier.isIdentifier(imported))
            throw new Error('imported is not a Identifier: ' + Class.toString(imported));
        this.location = location;
        this.local = local;
        this.imported = imported;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        local?: Declarator.Declarator,
        imported?: Identifier.Identifier
    }) {
        return new ImportSpecifier({
            ...this,
            ...properties
        });
    }
    static is(value): value is ImportSpecifier {
        return isImportSpecifier(value);
    }
}
export function isImportSpecifier(value): value is ImportSpecifier {
    return Class.isInstance(ImportSpecifier, value);
}
export default ImportSpecifier;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as ModuleSpecifier from './ModuleSpecifier';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class ImportNamespaceSpecifier implements _Object.Object , ModuleSpecifier.ModuleSpecifier , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly local: Declarator.Declarator;
    static readonly id = 'ImportNamespaceSpecifier';
    static readonly implements = new Set([
        'ImportNamespaceSpecifier',
        'ion_Object',
        'ModuleSpecifier',
        'Node'
    ]);
    constructor({$ = 0, location = null, local}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        local: Declarator.Declarator
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Declarator.isDeclarator(local))
            throw new Error('local is not a Declarator: ' + Class.toString(local));
        this.$ = $;
        this.location = location;
        this.local = local;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        local?: Declarator.Declarator
    }) {
        return new ImportNamespaceSpecifier({
            ...this,
            ...properties
        });
    }
    static is(value): value is ImportNamespaceSpecifier {
        return isImportNamespaceSpecifier(value);
    }
}
export function isImportNamespaceSpecifier(value): value is ImportNamespaceSpecifier {
    return Class.isInstance(ImportNamespaceSpecifier, value);
}
export default ImportNamespaceSpecifier;
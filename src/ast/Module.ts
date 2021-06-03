/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as ImportStep from './ImportStep';
import * as Declaration from './Declaration';
import * as Class from './ion/Class';
export class Module implements _Object.Object , Scope.Scope , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly imports: _Array.Array<ImportStep.ImportStep>;
    readonly declarations: _Array.Array<Declaration.Declaration>;
    static readonly id = 'Module';
    static readonly implements = new Set([
        'Module',
        'ion_Object',
        'Scope',
        'Node'
    ]);
    constructor({location = null, imports = [], declarations}: {
        location?: Location.Location | Null.Null,
        imports?: _Array.Array<ImportStep.ImportStep>,
        declarations: _Array.Array<Declaration.Declaration>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!_Array.isArray(imports))
            throw new Error('imports is not a Array: ' + Class.toString(imports));
        if (!_Array.isArray(declarations))
            throw new Error('declarations is not a Array: ' + Class.toString(declarations));
        this.location = location;
        this.imports = imports;
        this.declarations = declarations;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        imports?: _Array.Array<ImportStep.ImportStep>,
        declarations?: _Array.Array<Declaration.Declaration>
    }) {
        return new Module({
            ...this,
            ...properties
        });
    }
    static is(value): value is Module {
        return isModule(value);
    }
}
export function isModule(value): value is Module {
    return Class.isInstance(Module, value);
}
export default Module;
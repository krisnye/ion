/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as VariableDeclaration from './VariableDeclaration';
import * as Class from './ion/Class';
export class InstanceDeclarations implements _Object.Object , Scope.Scope , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly declarations: _Array.Array<VariableDeclaration.VariableDeclaration>;
    static readonly id = 'InstanceDeclarations';
    static readonly implements = new Set([
        'InstanceDeclarations',
        'ion_Object',
        'Scope',
        'Node'
    ]);
    constructor({$ = 0, location = null, declarations}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        declarations: _Array.Array<VariableDeclaration.VariableDeclaration>
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!_Array.isArray(declarations))
            throw new Error('declarations is not a Array: ' + Class.toString(declarations));
        this.$ = $;
        this.location = location;
        this.declarations = declarations;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        declarations?: _Array.Array<VariableDeclaration.VariableDeclaration>
    }) {
        return new InstanceDeclarations({
            ...this,
            ...properties
        });
    }
    static is(value): value is InstanceDeclarations {
        return isInstanceDeclarations(value);
    }
}
export function isInstanceDeclarations(value): value is InstanceDeclarations {
    return Class.isInstance(InstanceDeclarations, value);
}
export default InstanceDeclarations;
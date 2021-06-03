/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Id from './Id';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class ImportStep implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly relative: Boolean.Boolean;
    readonly id: Id.Id | Null.Null;
    readonly as: Id.Id | Null.Null;
    readonly children: _Array.Array<ImportStep> | Boolean.Boolean;
    static readonly id = 'ImportStep';
    static readonly implements = new Set([
        'ImportStep',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, relative, id = null, as = null, children}: {
        location?: Location.Location | Null.Null,
        relative: Boolean.Boolean,
        id?: Id.Id | Null.Null,
        as?: Id.Id | Null.Null,
        children: _Array.Array<ImportStep> | Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Boolean.isBoolean(relative))
            throw new Error('relative is not a Boolean: ' + Class.toString(relative));
        if (!(Id.isId(id) || Null.isNull(id)))
            throw new Error('id is not a Id | Null: ' + Class.toString(id));
        if (!(Id.isId(as) || Null.isNull(as)))
            throw new Error('as is not a Id | Null: ' + Class.toString(as));
        if (!(_Array.isArray(children) || Boolean.isBoolean(children)))
            throw new Error('children is not a Array | Boolean: ' + Class.toString(children));
        this.location = location;
        this.relative = relative;
        this.id = id;
        this.as = as;
        this.children = children;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        relative?: Boolean.Boolean,
        id?: Id.Id | Null.Null,
        as?: Id.Id | Null.Null,
        children?: _Array.Array<ImportStep> | Boolean.Boolean
    }) {
        return new ImportStep({
            ...this,
            ...properties
        });
    }
    static is(value): value is ImportStep {
        return isImportStep(value);
    }
}
export function isImportStep(value): value is ImportStep {
    return Class.isInstance(ImportStep, value);
}
export default ImportStep;
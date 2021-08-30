/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class Declaration implements _Object.Object , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly id: Declarator.Declarator;
    static readonly id = 'Declaration';
    static readonly implements = new Set([
        'Declaration',
        'ion_Object',
        'Statement',
        'Node'
    ]);
    constructor({location = null, id}: {
        location?: Location.Location | Null.Null,
        id: Declarator.Declarator
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        this.location = location;
        this.id = id;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        id?: Declarator.Declarator
    }) {
        return new Declaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is Declaration {
        return isDeclaration(value);
    }
}
export function isDeclaration(value): value is Declaration {
    return Class.isInstance(Declaration, value);
}
export default Declaration;
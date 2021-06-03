/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Variable from './Variable';
import * as Declaration from './Declaration';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as TypeDefinition from './TypeDefinition';
import * as Reference from './Reference';
import * as Id from './Id';
import * as Expression from './Expression';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class VariableDeclaration implements _Object.Object , Variable.Variable , Declaration.Declaration , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly id: Id.Id;
    readonly value: Expression.Expression | Null.Null;
    readonly assignable: Boolean.Boolean;
    readonly export: Boolean.Boolean;
    readonly virtual: Boolean.Boolean;
    static readonly id = 'VariableDeclaration';
    static readonly implements = new Set([
        'VariableDeclaration',
        'ion_Object',
        'Variable',
        'Declaration',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        id,
        value = null,
        assignable = false,
        export: _export = false,
        virtual = false
    }: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id: Id.Id,
        value?: Expression.Expression | Null.Null,
        assignable?: Boolean.Boolean,
        export?: Boolean.Boolean,
        virtual?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!Id.isId(id))
            throw new Error('id is not a Id: ' + Class.toString(id));
        if (!(Expression.isExpression(value) || Null.isNull(value)))
            throw new Error('value is not a Expression | Null: ' + Class.toString(value));
        if (!Boolean.isBoolean(assignable))
            throw new Error('assignable is not a Boolean: ' + Class.toString(assignable));
        if (!Boolean.isBoolean(_export))
            throw new Error('export is not a Boolean: ' + Class.toString(_export));
        if (!Boolean.isBoolean(virtual))
            throw new Error('virtual is not a Boolean: ' + Class.toString(virtual));
        this.location = location;
        this.type = type;
        this.id = id;
        this.value = value;
        this.assignable = assignable;
        this.export = _export;
        this.virtual = virtual;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id?: Id.Id,
        value?: Expression.Expression | Null.Null,
        assignable?: Boolean.Boolean,
        export?: Boolean.Boolean,
        virtual?: Boolean.Boolean
    }) {
        return new VariableDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is VariableDeclaration {
        return isVariableDeclaration(value);
    }
}
export function isVariableDeclaration(value): value is VariableDeclaration {
    return Class.isInstance(VariableDeclaration, value);
}
export default VariableDeclaration;
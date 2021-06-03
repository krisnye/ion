/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as VariableDeclaration from './VariableDeclaration';
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
export class ConditionalDeclaration implements _Object.Object , VariableDeclaration.VariableDeclaration , Variable.Variable , Declaration.Declaration , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly id: Id.Id;
    readonly value: Expression.Expression | Null.Null;
    readonly assignable: Boolean.Boolean;
    readonly export: Boolean.Boolean;
    readonly virtual: Boolean.Boolean;
    readonly negate: Boolean.Boolean;
    static readonly id = 'ConditionalDeclaration';
    static readonly implements = new Set([
        'ConditionalDeclaration',
        'ion_Object',
        'VariableDeclaration',
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
        virtual = false,
        negate = false
    }: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id: Id.Id,
        value?: Expression.Expression | Null.Null,
        assignable?: Boolean.Boolean,
        export?: Boolean.Boolean,
        virtual?: Boolean.Boolean,
        negate?: Boolean.Boolean
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
        if (!Boolean.isBoolean(negate))
            throw new Error('negate is not a Boolean: ' + Class.toString(negate));
        this.location = location;
        this.type = type;
        this.id = id;
        this.value = value;
        this.assignable = assignable;
        this.export = _export;
        this.virtual = virtual;
        this.negate = negate;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id?: Id.Id,
        value?: Expression.Expression | Null.Null,
        assignable?: Boolean.Boolean,
        export?: Boolean.Boolean,
        virtual?: Boolean.Boolean,
        negate?: Boolean.Boolean
    }) {
        return new ConditionalDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is ConditionalDeclaration {
        return isConditionalDeclaration(value);
    }
}
export function isConditionalDeclaration(value): value is ConditionalDeclaration {
    return Class.isInstance(ConditionalDeclaration, value);
}
export default ConditionalDeclaration;
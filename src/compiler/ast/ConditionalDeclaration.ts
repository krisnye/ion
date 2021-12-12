/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Declaration from './Declaration';
import * as Statement from './Statement';
import * as SideEffect from './SideEffect';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class ConditionalDeclaration implements _Object.Object , Declaration.Declaration , Statement.Statement , SideEffect.SideEffect , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly id: Declarator.Declarator;
    readonly isMutable: Boolean.Boolean;
    readonly negate: Boolean.Boolean;
    static readonly id = 'ConditionalDeclaration';
    static readonly implements = new Set([
        'ConditionalDeclaration',
        'ion_Object',
        'Declaration',
        'Statement',
        'SideEffect',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, id, isMutable = false, negate = false}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        id: Declarator.Declarator,
        isMutable?: Boolean.Boolean,
        negate?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!Boolean.isBoolean(isMutable))
            throw new Error('isMutable is not a Boolean: ' + Class.toString(isMutable));
        if (!Boolean.isBoolean(negate))
            throw new Error('negate is not a Boolean: ' + Class.toString(negate));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.id = id;
        this.isMutable = isMutable;
        this.negate = negate;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        id?: Declarator.Declarator,
        isMutable?: Boolean.Boolean,
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
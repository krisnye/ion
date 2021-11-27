/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as SideEffect from './SideEffect';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Pattern from './Pattern';
import * as Identifier from './Identifier';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class Declaration implements _Object.Object , Statement.Statement , SideEffect.SideEffect , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Pattern.Pattern | (Identifier.Identifier | Expression.Expression);
    readonly isMutable: Boolean.Boolean;
    static readonly id = 'Declaration';
    static readonly implements = new Set([
        'Declaration',
        'ion_Object',
        'Statement',
        'SideEffect',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, id, isMutable = false}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id: Pattern.Pattern | (Identifier.Identifier | Expression.Expression),
        isMutable?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Pattern.isPattern(id) || (Identifier.isIdentifier(id) || Expression.isExpression(id))))
            throw new Error('id is not a Pattern | Identifier | Expression: ' + Class.toString(id));
        if (!Boolean.isBoolean(isMutable))
            throw new Error('isMutable is not a Boolean: ' + Class.toString(isMutable));
        this.location = location;
        this.type = type;
        this.id = id;
        this.isMutable = isMutable;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Pattern.Pattern | (Identifier.Identifier | Expression.Expression),
        isMutable?: Boolean.Boolean
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
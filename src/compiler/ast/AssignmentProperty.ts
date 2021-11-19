/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Identifier from './Identifier';
import * as Pattern from './Pattern';
import * as Class from './ion/Class';
export class PatternProperty implements _Object.Object , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly key: Expression.Expression | Identifier.Identifier;
    readonly id: Pattern.Pattern | Expression.Expression;
    static readonly id = 'AssignmentProperty_PatternProperty';
    static readonly implements = new Set([
        'AssignmentProperty_PatternProperty',
        'ion_Object',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, key, id}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        key: Expression.Expression | Identifier.Identifier,
        id: Pattern.Pattern | Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Expression.isExpression(key) || Identifier.isIdentifier(key)))
            throw new Error('key is not a Expression | Identifier: ' + Class.toString(key));
        if (!(Pattern.isPattern(id) || Expression.isExpression(id)))
            throw new Error('id is not a Pattern | Expression: ' + Class.toString(id));
        this.location = location;
        this.type = type;
        this.key = key;
        this.id = id;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        key?: Expression.Expression | Identifier.Identifier,
        id?: Pattern.Pattern | Expression.Expression
    }) {
        return new PatternProperty({
            ...this,
            ...properties
        });
    }
    static is(value): value is PatternProperty {
        return isPatternProperty(value);
    }
}
export function isPatternProperty(value): value is PatternProperty {
    return Class.isInstance(PatternProperty, value);
}
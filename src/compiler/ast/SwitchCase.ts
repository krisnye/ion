/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as BlockStatement from './BlockStatement';
import * as Class from './ion/Class';
export class SwitchCase implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly test: Expression.Expression | Null.Null;
    readonly consequent: BlockStatement.BlockStatement | Null.Null;
    static readonly id = 'SwitchCase';
    static readonly implements = new Set([
        'SwitchCase',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, test, consequent}: {
        location?: Location.Location | Null.Null,
        test: Expression.Expression | Null.Null,
        consequent: BlockStatement.BlockStatement | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(test) || Null.isNull(test)))
            throw new Error('test is not a Expression | Null: ' + Class.toString(test));
        if (!(BlockStatement.isBlockStatement(consequent) || Null.isNull(consequent)))
            throw new Error('consequent is not a BlockStatement | Null: ' + Class.toString(consequent));
        this.location = location;
        this.test = test;
        this.consequent = consequent;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        test?: Expression.Expression | Null.Null,
        consequent?: BlockStatement.BlockStatement | Null.Null
    }) {
        return new SwitchCase({
            ...this,
            ...properties
        });
    }
    static is(value): value is SwitchCase {
        return isSwitchCase(value);
    }
}
export function isSwitchCase(value): value is SwitchCase {
    return Class.isInstance(SwitchCase, value);
}
export default SwitchCase;
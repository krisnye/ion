/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Pattern from './Pattern';
import * as BlockStatement from './BlockStatement';
import * as Class from './ion/Class';
export class CatchClause implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly param: Pattern.Pattern;
    readonly body: BlockStatement.BlockStatement;
    static readonly id = 'CatchClause';
    static readonly implements = new Set([
        'CatchClause',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, param, body}: {
        location?: Location.Location | Null.Null,
        param: Pattern.Pattern,
        body: BlockStatement.BlockStatement
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Pattern.isPattern(param))
            throw new Error('param is not a Pattern: ' + Class.toString(param));
        if (!BlockStatement.isBlockStatement(body))
            throw new Error('body is not a BlockStatement: ' + Class.toString(body));
        this.location = location;
        this.param = param;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        param?: Pattern.Pattern,
        body?: BlockStatement.BlockStatement
    }) {
        return new CatchClause({
            ...this,
            ...properties
        });
    }
    static is(value): value is CatchClause {
        return isCatchClause(value);
    }
}
export function isCatchClause(value): value is CatchClause {
    return Class.isInstance(CatchClause, value);
}
export default CatchClause;
/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Block from './Block';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class Module implements _Object.Object , Block.Block , Expression.Expression , Scope.Scope , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly body: _Array.Array<Statement.Statement>;
    readonly name: String.String;
    static readonly id = 'Module';
    static readonly implements = new Set([
        'Module',
        'ion_Object',
        'Block',
        'Expression',
        'Scope',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, body, name = ''}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        body: _Array.Array<Statement.Statement>,
        name?: String.String
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.body = body;
        this.name = name;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        body?: _Array.Array<Statement.Statement>,
        name?: String.String
    }) {
        return new Module({
            ...this,
            ...properties
        });
    }
    static is(value): value is Module {
        return isModule(value);
    }
}
export function isModule(value): value is Module {
    return Class.isInstance(Module, value);
}
export default Module;
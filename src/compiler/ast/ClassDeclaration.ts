/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Meta from './Meta';
import * as Declaration from './Declaration';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Statement from './Statement';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Declarator from './Declarator';
import * as Variable from './Variable';
import * as Class from './ion/Class';
export class ClassDeclaration implements _Object.Object , Meta.Meta , Declaration.Declaration , Expression.Expression , Node.Node , Statement.Statement {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    readonly id: Declarator.Declarator;
    readonly type: Expression.Expression | Null.Null;
    readonly baseClasses: _Array.Array<Expression.Expression>;
    readonly declarations: _Array.Array<Variable.Variable>;
    readonly typeParameters: _Array.Array<Variable.Variable>;
    static readonly id = 'ClassDeclaration';
    static readonly implements = new Set([
        'ClassDeclaration',
        'ion_Object',
        'Meta',
        'Declaration',
        'Expression',
        'Node',
        'Statement'
    ]);
    constructor({location = null, meta = null, id, type = null, baseClasses = [], declarations, typeParameters = []}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        id: Declarator.Declarator,
        type?: Expression.Expression | Null.Null,
        baseClasses?: _Array.Array<Expression.Expression>,
        declarations: _Array.Array<Variable.Variable>,
        typeParameters?: _Array.Array<Variable.Variable>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!_Array.isArray(baseClasses))
            throw new Error('baseClasses is not a Array: ' + Class.toString(baseClasses));
        if (!_Array.isArray(declarations))
            throw new Error('declarations is not a Array: ' + Class.toString(declarations));
        if (!_Array.isArray(typeParameters))
            throw new Error('typeParameters is not a Array: ' + Class.toString(typeParameters));
        this.location = location;
        this.meta = meta;
        this.id = id;
        this.type = type;
        this.baseClasses = baseClasses;
        this.declarations = declarations;
        this.typeParameters = typeParameters;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        id?: Declarator.Declarator,
        type?: Expression.Expression | Null.Null,
        baseClasses?: _Array.Array<Expression.Expression>,
        declarations?: _Array.Array<Variable.Variable>,
        typeParameters?: _Array.Array<Variable.Variable>
    }) {
        return new ClassDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is ClassDeclaration {
        return isClassDeclaration(value);
    }
}
export function isClassDeclaration(value): value is ClassDeclaration {
    return Class.isInstance(ClassDeclaration, value);
}
export default ClassDeclaration;
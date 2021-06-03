/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Meta from './Meta';
import * as Declaration from './Declaration';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as Declarator from './Declarator';
import * as Parameter from './Parameter';
import * as Reference from './Reference';
import * as MemberExpression from './MemberExpression';
import * as VariableDeclaration from './VariableDeclaration';
import * as InstanceDeclarations from './InstanceDeclarations';
import * as Class from './ion/Class';
export class ClassDeclaration implements _Object.Object , Meta.Meta , Declaration.Declaration , Expression.Expression , Node.Node , Statement.Statement , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly isStruct: Boolean.Boolean;
    readonly isInterface: Boolean.Boolean;
    readonly isData: Boolean.Boolean;
    readonly id: Declarator.Declarator;
    readonly parameters: _Array.Array<Parameter.Parameter>;
    readonly baseClasses: _Array.Array<Reference.Reference | MemberExpression.MemberExpression>;
    readonly interfaces: _Array.Array<Reference.Reference | MemberExpression.MemberExpression>;
    readonly static: _Array.Array<VariableDeclaration.VariableDeclaration>;
    readonly instance: InstanceDeclarations.InstanceDeclarations;
    readonly instanceType: Type.Type | Null.Null;
    static readonly id = 'ClassDeclaration';
    static readonly implements = new Set([
        'ClassDeclaration',
        'ion_Object',
        'Meta',
        'Declaration',
        'Expression',
        'Node',
        'Statement',
        'Typed'
    ]);
    constructor({
        location = null,
        meta = null,
        type = null,
        isStruct = false,
        isInterface = false,
        isData = false,
        id,
        parameters = [],
        baseClasses = [],
        interfaces = [],
        static: _static,
        instance,
        instanceType = null
    }: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Type.Type | Null.Null,
        isStruct?: Boolean.Boolean,
        isInterface?: Boolean.Boolean,
        isData?: Boolean.Boolean,
        id: Declarator.Declarator,
        parameters?: _Array.Array<Parameter.Parameter>,
        baseClasses?: _Array.Array<Reference.Reference | MemberExpression.MemberExpression>,
        interfaces?: _Array.Array<Reference.Reference | MemberExpression.MemberExpression>,
        static: _Array.Array<VariableDeclaration.VariableDeclaration>,
        instance: InstanceDeclarations.InstanceDeclarations,
        instanceType?: Type.Type | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(isStruct))
            throw new Error('isStruct is not a Boolean: ' + Class.toString(isStruct));
        if (!Boolean.isBoolean(isInterface))
            throw new Error('isInterface is not a Boolean: ' + Class.toString(isInterface));
        if (!Boolean.isBoolean(isData))
            throw new Error('isData is not a Boolean: ' + Class.toString(isData));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!_Array.isArray(parameters))
            throw new Error('parameters is not a Array: ' + Class.toString(parameters));
        if (!_Array.isArray(baseClasses))
            throw new Error('baseClasses is not a Array: ' + Class.toString(baseClasses));
        if (!_Array.isArray(interfaces))
            throw new Error('interfaces is not a Array: ' + Class.toString(interfaces));
        if (!_Array.isArray(_static))
            throw new Error('static is not a Array: ' + Class.toString(_static));
        if (!InstanceDeclarations.isInstanceDeclarations(instance))
            throw new Error('instance is not a InstanceDeclarations: ' + Class.toString(instance));
        if (!(Type.isType(instanceType) || Null.isNull(instanceType)))
            throw new Error('instanceType is not a Type | Null: ' + Class.toString(instanceType));
        this.location = location;
        this.meta = meta;
        this.type = type;
        this.isStruct = isStruct;
        this.isInterface = isInterface;
        this.isData = isData;
        this.id = id;
        this.parameters = parameters;
        this.baseClasses = baseClasses;
        this.interfaces = interfaces;
        this.static = _static;
        this.instance = instance;
        this.instanceType = instanceType;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null,
        type?: Type.Type | Null.Null,
        isStruct?: Boolean.Boolean,
        isInterface?: Boolean.Boolean,
        isData?: Boolean.Boolean,
        id?: Declarator.Declarator,
        parameters?: _Array.Array<Parameter.Parameter>,
        baseClasses?: _Array.Array<Reference.Reference | MemberExpression.MemberExpression>,
        interfaces?: _Array.Array<Reference.Reference | MemberExpression.MemberExpression>,
        static?: _Array.Array<VariableDeclaration.VariableDeclaration>,
        instance?: InstanceDeclarations.InstanceDeclarations,
        instanceType?: Type.Type | Null.Null
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
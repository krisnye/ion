/*
This file was generated from ion source. Do not edit.
*/
import * as ImportSpecifier from './ImportSpecifier';
import * as ImportDefaultSpecifier from './ImportDefaultSpecifier';
import * as ImportNamespaceSpecifier from './ImportNamespaceSpecifier';
import * as _Object from './ion/Object';
import * as Declaration from './Declaration';
import * as Statement from './Statement';
import * as SideEffect from './SideEffect';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Pattern from './Pattern';
import * as Identifier from './Identifier';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Literal from './Literal';
import * as String from './ion/String';
import * as Class from './ion/Class';
export type Specifier = ImportSpecifier.ImportSpecifier | (ImportDefaultSpecifier.ImportDefaultSpecifier | ImportNamespaceSpecifier.ImportNamespaceSpecifier);
export function isSpecifier(value): value is Specifier {
    return ImportSpecifier.isImportSpecifier(value) || (ImportDefaultSpecifier.isImportDefaultSpecifier(value) || ImportNamespaceSpecifier.isImportNamespaceSpecifier(value));
}
export class ImportDeclaration implements _Object.Object , Declaration.Declaration , Statement.Statement , SideEffect.SideEffect , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Pattern.Pattern | (Identifier.Identifier | Expression.Expression);
    readonly isMutable: Boolean.Boolean;
    readonly specifiers: _Array.Array<Specifier | ImportDeclaration>;
    readonly path: _Array.Array<Literal.Literal | Identifier.Identifier> | Null.Null;
    readonly source: Literal.Literal;
    readonly absoluteSource: String.String | Null.Null;
    static readonly id = 'ImportDeclaration';
    static readonly implements = new Set([
        'ImportDeclaration',
        'ion_Object',
        'Declaration',
        'Statement',
        'SideEffect',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, id, isMutable = false, specifiers, path = null, source, absoluteSource = null}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id: Pattern.Pattern | (Identifier.Identifier | Expression.Expression),
        isMutable?: Boolean.Boolean,
        specifiers: _Array.Array<Specifier | ImportDeclaration>,
        path?: _Array.Array<Literal.Literal | Identifier.Identifier> | Null.Null,
        source: Literal.Literal,
        absoluteSource?: String.String | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Pattern.isPattern(id) || (Identifier.isIdentifier(id) || Expression.isExpression(id))))
            throw new Error('id is not a Pattern | Identifier | Expression: ' + Class.toString(id));
        if (!Boolean.isBoolean(isMutable))
            throw new Error('isMutable is not a Boolean: ' + Class.toString(isMutable));
        if (!_Array.isArray(specifiers))
            throw new Error('specifiers is not a Array: ' + Class.toString(specifiers));
        if (!(_Array.isArray(path) || Null.isNull(path)))
            throw new Error('path is not a Array | Null: ' + Class.toString(path));
        if (!Literal.isLiteral(source))
            throw new Error('source is not a Literal: ' + Class.toString(source));
        if (!(String.isString(absoluteSource) || Null.isNull(absoluteSource)))
            throw new Error('absoluteSource is not a String | Null: ' + Class.toString(absoluteSource));
        this.location = location;
        this.type = type;
        this.id = id;
        this.isMutable = isMutable;
        this.specifiers = specifiers;
        this.path = path;
        this.source = source;
        this.absoluteSource = absoluteSource;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Pattern.Pattern | (Identifier.Identifier | Expression.Expression),
        isMutable?: Boolean.Boolean,
        specifiers?: _Array.Array<Specifier | ImportDeclaration>,
        path?: _Array.Array<Literal.Literal | Identifier.Identifier> | Null.Null,
        source?: Literal.Literal,
        absoluteSource?: String.String | Null.Null
    }) {
        return new ImportDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is ImportDeclaration {
        return isImportDeclaration(value);
    }
}
export function isImportDeclaration(value): value is ImportDeclaration {
    return Class.isInstance(ImportDeclaration, value);
}
export default ImportDeclaration;
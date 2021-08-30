/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declaration from './Declaration';
import * as _Array from './ion/Array';
import * as ExportSpecifier from './ExportSpecifier';
import * as Literal from './Literal';
import * as Class from './ion/Class';
export class ExportNamedDeclaration implements _Object.Object , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly declaration: Declaration.Declaration | Null.Null;
    readonly specifiers: _Array.Array<ExportSpecifier.ExportSpecifier>;
    readonly source: Literal.Literal | Null.Null;
    static readonly id = 'ExportNamedDeclaration';
    static readonly implements = new Set([
        'ExportNamedDeclaration',
        'ion_Object',
        'Statement',
        'Node'
    ]);
    constructor({location = null, declaration = null, specifiers, source = null}: {
        location?: Location.Location | Null.Null,
        declaration?: Declaration.Declaration | Null.Null,
        specifiers: _Array.Array<ExportSpecifier.ExportSpecifier>,
        source?: Literal.Literal | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Declaration.isDeclaration(declaration) || Null.isNull(declaration)))
            throw new Error('declaration is not a Declaration | Null: ' + Class.toString(declaration));
        if (!_Array.isArray(specifiers))
            throw new Error('specifiers is not a Array: ' + Class.toString(specifiers));
        if (!(Literal.isLiteral(source) || Null.isNull(source)))
            throw new Error('source is not a Literal | Null: ' + Class.toString(source));
        this.location = location;
        this.declaration = declaration;
        this.specifiers = specifiers;
        this.source = source;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        declaration?: Declaration.Declaration | Null.Null,
        specifiers?: _Array.Array<ExportSpecifier.ExportSpecifier>,
        source?: Literal.Literal | Null.Null
    }) {
        return new ExportNamedDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is ExportNamedDeclaration {
        return isExportNamedDeclaration(value);
    }
}
export function isExportNamedDeclaration(value): value is ExportNamedDeclaration {
    return Class.isInstance(ExportNamedDeclaration, value);
}
export default ExportNamedDeclaration;
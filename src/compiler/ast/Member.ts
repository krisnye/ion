import { EvaluationContext } from "../EvaluationContext";
import { getResolvePaths, join } from "../pathFunctions";
import { SemanticError } from "../SemanticError";
import { Call } from "./Call";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";
import { ObjectType } from "./ObjectType";
import { Reference } from "./Reference";
import { isType, Type } from "./Type";
import { UnionType } from "./UnionType";

export interface MemberProps extends ExpressionProps {
    object: typeof Member.prototype.object;
    property: typeof Member.prototype.property;
}

export class Member extends Expression {

    object!: Expression;
    property!: Expression | Identifier | Type;

    constructor(props: MemberProps) { super(props); }
    patch(props: Partial<MemberProps>) { return super.patch(props); }

    get computed() {
        return this.property instanceof Expression;
    }

    getPropertyKey(): Identifier | Type {
        if (this.property instanceof Identifier) {
            return this.property;
        }
        if (this.property instanceof Expression) {
            return this.property.type!;
        }
        if (isType(this.property)) {
            return this.property;
        }
        throw new SemanticError(`Invalid key`, this.property);
    }

    *getDependencies(c: EvaluationContext): Generator<Expression> {
        yield this.object;
        if (this.property instanceof Expression) {
            yield this.property;
        }
        else if (this.property instanceof Identifier) {
            for (let declaration of c.getDeclarations(this.object, this.property.name)) {
                yield declaration;
            }
        }
    }

    protected resolve(c: EvaluationContext): Expression {
        // if (this.toString() === "`test.sample.value`.double") {
        //     debugger;
        // }
        let objectType = c.getComparisonType(this.object.type!);
        for (const option of UnionType.split(objectType)) {
            let type: Type | null = null;
            if (option instanceof ObjectType) {
                const key = this.getPropertyKey();
                type = option.getPropertyType(key, c);
            }
            if (type == null) {
                // check for a method call syntax
                if (this.property instanceof Identifier) {
                    let name = this.property.name;
                    let fullPath = join(this.property.location.filename, name);
                    //  check the name first in case it's just a locally scoped variable.
                    let checkPaths = [name, ...getResolvePaths(fullPath)];
                    for (let check of checkPaths) {
                        let declarations = c.getDeclarations(this.object, check);
                        if (declarations.length > 0) {
                            // convert this to a function call.
                            return new Call({
                                location: this.location,
                                uniformFunctionCallSyntax: true,
                                callee: new Reference({
                                    location: this.property.location,
                                    name: check
                                }),
                                nodes: [
                                    this.object
                                ]
                            });
                        }
                    }
                }
                throw new SemanticError(`Cannot read property ${this.property} from type ${this.object.type}`, this.property, option);
            }
        }
        return super.resolve(c);
    }

    protected resolveType(c: EvaluationContext) {
        let objectType = c.getComparisonType(this.object.type!);
        let types = new Array<Type>();
        for (const option of UnionType.split(objectType)) {
            let type: Type | null = null;
            if (option instanceof ObjectType) {
                const key = this.getPropertyKey();
                type = option.getPropertyType(key, c);
            }
            if (type == null) {
                throw new SemanticError(`Cannot read property ${this.property} from type ${this.object.type}`, this.property, option);
            }
            types.push(type);
        }
        return UnionType.join(...types);
    }

    toString() {
        return this.computed ? `${this.object}[${this.property}]` : `${this.object}.${this.property}`;
    }

}
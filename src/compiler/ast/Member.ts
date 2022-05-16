import { EvaluationContext } from "../EvaluationContext";
import { SemanticError } from "../SemanticError";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";
import { IntersectionType } from "./IntersectionType";
import { ObjectType } from "./ObjectType";
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

    *getDependencies(c: EvaluationContext): Generator<Expression> {
        yield this.object;
        if (this.property instanceof Expression) {
            yield this.property;
        }    
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

    protected resolveType(c: EvaluationContext) {
        debugger;
        let objectType = c.getComparisonType(this.object.type!);
        let types = new Array<Type>();
        for (const option of UnionType.split(objectType)) {
            if (!(option instanceof ObjectType)) {
                throw new SemanticError(`Not an Object Type`, this.object);
            }
            const key = this.getPropertyKey();
            const type = option.getPropertyType(key, c);
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
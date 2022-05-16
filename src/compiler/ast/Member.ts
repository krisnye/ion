import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";
import { Type } from "./Type";

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

    protected resolveType(c: EvaluationContext) {
        // let objectType = this.object.type as ObjectType;
        // let expandedType = objectType.toSimpleObjectType(c);
        // console.log("================= TODO: Member Resolve Type: " + this);
        // console.log(JSON.stringify(expandedType, null, 2));
        return super.resolveType(c);
    }

    toString() {
        return this.computed ? `${this.object}[${this.property}]` : `${this.object}.${this.property}`;
    }

}
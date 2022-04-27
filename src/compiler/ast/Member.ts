import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";

export interface MemberProps extends ExpressionProps {
    object: Expression;
    property: Expression | Identifier;
}

export class Member extends Expression {

    object!: Expression;
    property!: Expression | Identifier;

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

    resolveType(c: EvaluationContext) {
        let objectType = this.object.type;
        console.log({ memberObjectType: objectType });
        console.log("================= TODO: Member Resolve Type: " + this);
        return super.resolveType(c);
    }

    toString() {
        return this.computed ? `${this.object}[${this.property}]` : `${this.object}.${this.property}`;
    }

}
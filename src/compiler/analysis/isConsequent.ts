import { CompoundType } from "../ast/CompoundType";
import { IntersectionType } from "../ast/IntersectionType";
import { Type } from "../ast/Type";
import { UnionType } from "../ast/UnionType";
import { EvaluationContext } from "../EvaluationContext";

export function isConsequent(asserted: Type, consequent: Type, c: EvaluationContext): boolean | null {
    if (asserted instanceof CompoundType) {
        const left = isConsequent(asserted.left, consequent, c);
        const right = isConsequent(asserted.right, consequent, c);
        if (left === true && right === true) {
            return true;
        }
        if (asserted instanceof UnionType) {
            if (left === false && right === false) {
                return false;
            }
        }
        else { // asserted instanceof IntersectionType
            if (left === false || right === false) {
                return false;
            }
        }
        return null;
    }
    if (consequent instanceof UnionType) {
        return isConsequent(asserted, consequent.left, c) || isConsequent(asserted, consequent.right, c);
    }
    if (consequent instanceof IntersectionType) {
        return isConsequent(asserted, consequent.left, c) && isConsequent(asserted, consequent.right, c);
    }
    return asserted.isSubtypeOf(consequent);
}
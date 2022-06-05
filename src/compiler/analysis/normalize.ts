import { Expression } from "../ast/Expression";
import { NumberLiteral } from "../ast/NumberLiteral";
import { NumberType } from "../ast/NumberType";
import { Type } from "../ast/Type";


function compareExpressions(a?: Expression, b?: Expression) {
    if (a === b) {
        return 0;
    }
    if (a == null) {
        return 1;
    }
    if (b == null) {
        return -1;
    }
    if (a instanceof NumberLiteral && b instanceof NumberLiteral) {
        return a.value - b.value;
    }
    return a.toString().localeCompare(b.toString());
}

function compareTypes(a: Type, b: Type) {
    if (a instanceof NumberType && b instanceof NumberType) {
        return (Number(a.integer) - Number(b.integer)) || compareExpressions(a.min, b.min) || compareExpressions(a.max, b.max);
    }
    return compareExpressions(a, b);
}

export function sortTypes(types: Type[]) {
    types = types.slice(0);
    types.sort(compareTypes);
    return types;
}
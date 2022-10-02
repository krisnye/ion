
export enum LogicalOperators {
    or = "||",
    and = "&&",
    is = "is",
    equals = "==",
    notEquals = "!="
}

const setOfLogicalOperators: Set<string> = new Set(Object.values(LogicalOperators));

export function isLogicalOperator(operator: string) {
    return setOfLogicalOperators.has(operator);
}

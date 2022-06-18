// import { TypeOperators } from "../analysis/TypeOperators";
// import { coreTypes } from "../coreTypes";
// import { EvaluationContext } from "../EvaluationContext";
// import { BaseType, BaseTypeProps } from "./BaseType";
// import { BinaryExpression } from "./BinaryExpression";
// import { Expression, ExpressionProps } from "./Expression";
// import { Reference } from "./Reference";
// import { StringLiteral } from "./StringLiteral";
// import { BasicType, Type } from "./Type";
// import { TypeReference } from "./TypeReference";

// export interface StringTypeProps extends BaseTypeProps {
//     value: string | null
// }

// export class StringType extends BaseType {

//     value!: string | null;

//     constructor(props: StringTypeProps) {
//         super(props);
//     }

//     merge(b: Type, union: boolean): Type | null {
//         return null;
//     }

//     getBasicTypes(c: EvaluationContext) {
//         return BasicType.String;
//     }

//     toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
//         const { location } = this;
//         return BinaryExpression.join(TypeOperators.and,
//             new BinaryExpression({
//                 location, left: dot, operator: TypeOperators.is, right: new TypeReference({ location, name: coreTypes.String, resolved: true })
//             }),
//             this.value == null
//                 ? null
//                 : new BinaryExpression({
//                     location,
//                     left: dot,
//                     operator: "==",
//                     right: new StringLiteral({ location, value: this.value })
//                 })
//         )
//     }


//     toString() {
//         return `(${this.value ? JSON.stringify(this.value) : "String"})`;
//     }

// }
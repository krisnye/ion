// import { TypeOperators } from "../analysis/TypeOperators";
// import { EvaluationContext } from "../EvaluationContext";
// import { BaseType, BaseTypeProps } from "./BaseType";
// import { BinaryExpression } from "./BinaryExpression";
// import { Expression } from "./Expression";
// import { BasicType, Type } from "./Type";

// export interface VoidTypeProps extends BaseTypeProps {
// }

// export class VoidType extends BaseType {

//     constructor(props: VoidTypeProps) { super(props); }
//     patch(props: Partial<VoidTypeProps>) {
//         return super.patch(props);
//     }

//     merge(b: Type, union: boolean) {
//         return null;
//     }

//     getBasicTypes() {
//         return BasicType.Void;
//     }

//     toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
//         return new BinaryExpression({
//             location: this.location,
//             left: dot,
//             operator: TypeOperators.notEquals,
//             right: dot
//         });
//     }

//     toString() {
//         return `Void`;
//     }

// }
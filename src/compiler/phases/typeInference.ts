import { Phase } from "./Phase";
import { createConverterPhase } from "../converters/Converter";
import { Scope } from "../ast/Scope";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { FloatLiteral } from "../ast/FloatLiteral";
import { StringLiteral } from "../ast/StringLiteral";
import { Variable } from "../ast/Variable";
import { Reference } from "../ast/Reference";
import { coreTypes } from "../coreTypes";
import { GetVariableFunction } from "./createScopeMaps";

const converterPhase = createConverterPhase([
    //  IntegerLiteral.type = Integer
    [IntegerLiteral, (a: IntegerLiteral) => a.type == null && a.patch({ type: new Reference({ location: a.location, name: coreTypes.Integer, constant: true }), constant: true })],
    //  FloatLiteral.type = Float
    [FloatLiteral, (a: FloatLiteral) => a.type == null && a.patch({ type: new Reference({ location: a.location, name: coreTypes.Float, constant: true }), constant: true })],
    //  StringLiteral.type = String
    [StringLiteral, (a: StringLiteral) => a.type == null && a.patch({ type: new Reference({ location: a.location, name: coreTypes.String, constant: true }), constant: true })],
    //  Variable.type = value.type
    [Variable, (a: Variable) => a.type == null && a.value?.type && a.patch({ type: a.value.type }) ],
    //  Reference.type = referenced Variable.type
    [Reference, (a: Reference, getVariable: GetVariableFunction) =>  {
        if (a.type == null) {
            let variable = getVariable(a);
            if (variable.type) {
                return a.patch({ type: variable.type });
            }
        }
    }],
] as any);

export function typeInference(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
    return converterPhase(moduleName, module, externals);
}

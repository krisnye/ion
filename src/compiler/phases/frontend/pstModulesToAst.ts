import { Phase } from "../Phase";
import { Module as AstModule } from "../../ast/Module";

export function pstModulesToAst(moduleName, module): ReturnType<Phase> {
    let { dependencies, ...rest } = module;
    return [new AstModule(rest), []];
}
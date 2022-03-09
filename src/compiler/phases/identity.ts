import { Phase } from "./Phase";

export function identity(moduleName, module): ReturnType<Phase> {
    return [module, []];
}

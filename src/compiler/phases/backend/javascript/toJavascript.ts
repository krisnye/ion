import { Phase } from "../../Phase";
import escodegen from "escodegen";

export function toJavascript(moduleName, module): ReturnType<Phase> {
    let options = {};
    let javascript = escodegen.generate(module, options);
    return [javascript, []];
}

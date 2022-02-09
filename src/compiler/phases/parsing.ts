import { createParser } from "../parser/createParser";

const parser = createParser();

export function parsing(moduleName, tokens) {
    return parser.parseModule(moduleName, tokens);
}

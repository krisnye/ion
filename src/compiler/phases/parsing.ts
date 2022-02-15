import { createParser } from "../parser/createParser";
import { Phase } from "./Phase";

const parser = createParser();

export function parsing(moduleName, tokens): ReturnType<Phase> {
    return [parser.parseModule(moduleName, tokens), []];
}

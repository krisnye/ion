import { createTokenizer } from "../tokenizer/createTokenizer";
import { Phase } from "./Phase";

const tokenizer = createTokenizer();

export function tokenization(moduleName, moduleSource): ReturnType<Phase> {
    return [tokenizer.tokenize(moduleName, moduleSource), []];
}

import { createTokenizer } from "../tokenizer/createTokenizer";

const tokenizer = createTokenizer();

export function tokenization(moduleName, moduleSource) {
    return tokenizer.tokenize(moduleName, moduleSource);
}

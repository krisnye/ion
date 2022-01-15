import { Tokenizer } from "./Tokenizer";
import { tokenTypes } from "./TokenType";

export function createTokenizer() {
    return new Tokenizer(tokenTypes);
}
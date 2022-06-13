import { createParser } from "../parser/createParser";
import { Token } from "../Token";
import { tokenTypes } from "../tokenizer/TokenType";
import { Phase } from "./Phase";

const parser = createParser();

export function removeInlineDents(moduleName, tokens: Token[]): ReturnType<Phase> {
    function isValidDentPrevious(token: Token | undefined) {
        return token == null || token.type === tokenTypes.Dent.name || token.type === tokenTypes.Eol.name;
    }
    let result = tokens.map((token, index) => {
        if (token.type === tokenTypes.Dent.name && !isValidDentPrevious(tokens[index - 1])) {
            token = new Token({ ... token, type: tokenTypes.Whitespace.name });
        }
        return token;
    })
    let errors = [];
    return [result, errors];
}

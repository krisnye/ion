import { opsToNodes } from "./opsToNodes";
import { parsing } from "./parsing";
import { Phase } from "./Phase";
import { tokenization } from "./tokenization";

export const lexical: Phase[] = [
    tokenization,
    parsing,
    opsToNodes,
];

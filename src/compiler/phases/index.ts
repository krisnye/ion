import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { syntacticChecks } from "./syntacticChecks";
import { opsToNodes } from "./opsToNodes";
import { bindIndents } from "./bindIndents";

export const lexical: Phase[] = [
    tokenization,
    parsing,
    syntacticChecks,
    bindIndents,
    opsToNodes,
];

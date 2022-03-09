import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { syntacticChecks } from "./syntacticChecks";
import { opsToNodes } from "./opsToNodes";
import { bindIndents } from "./bindIndents";
import { flattenSequences } from "./flattenSequences";
import { identity } from "./identity";

export const lexical: Phase[] = [
    tokenization,
    parsing,
    syntacticChecks,
    bindIndents,
    opsToNodes,
    flattenSequences,
    identity,
];

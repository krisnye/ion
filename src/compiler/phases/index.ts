import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { syntacticChecks } from "./syntacticChecks";
import { opsToNodes } from "./opsToNodes";
import { flattenSequences } from "./flattenSequences";
import { identity } from "./identity";
import { removeSoloBlocks } from "./removeSoloBlocks";
import { resolveExternalReferences } from "./resolveExternalReferences";
import { groupPhase } from "./groupPhase";

export const soloPhases: Phase[] = [
    tokenization,
    parsing,
    syntacticChecks,
    opsToNodes,
    removeSoloBlocks,
    flattenSequences,
    resolveExternalReferences,
    identity,
];

export const groupPhases: Phase[] = [
    groupPhase,
]

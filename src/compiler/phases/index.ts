import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { syntacticChecks } from "./syntacticChecks";
import { opsToNodes } from "./opsToNodes";
import { flattenSequences } from "./flattenSequences";
import { identity } from "./identity";
import { removeSoloBlocks } from "./removeSoloBlocks";
import { resolveExternalReferences } from "./resolveExternalReferences";
import { typeInference } from "./typeInference";
import { simplify } from "./simplify";
import { constantEvaluation } from "./constantEvaluation";

export const parsingPhases: Phase[] = [
    tokenization,
    parsing,
    syntacticChecks,
    opsToNodes,
    removeSoloBlocks,
    flattenSequences,
    resolveExternalReferences,
    //  MUST be solo up to this point so we can get external dependencies.
];

export const intermediatePhases: Phase[] = [
    typeInference,
    simplify,
    constantEvaluation,
]

export const assemblyPhases: Phase[] = [
    identity,
]

import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { destructuringAndUnaryNumberLiterals } from "./destructuringAndUnaryNumberLiterals";
import { opsToValueNodes as opsToValueNodes } from "./opsToValueNodes";
import { flattenSequencesAddMeta } from "./flattenSequencesAddMeta";
import { identity } from "./identity";
import { resolveExternalReferences } from "./resolveExternalReferences";
import { typeInference } from "./typeInference";
import { opsToTypeNodes } from "./opsToTypeNodes";
import { pstModulesToAst } from "./pstModulesToAst";
import { createMultiFunctions } from "./createMultiFunctions";
import { removeSoloBlocks } from "./removeSoloBlocks";

export const parsingPhases: Phase[] = [
    tokenization,
    parsing,
    destructuringAndUnaryNumberLiterals,
    opsToTypeNodes,
    opsToValueNodes,
    flattenSequencesAddMeta,
    removeSoloBlocks,
    createMultiFunctions,
    resolveExternalReferences,
    //  MUST be solo up to this point so we can get external dependencies.
];

export const intermediatePhases: Phase[] = [
    pstModulesToAst,
    typeInference,
]

export const assemblyPhases: Phase[] = [
    identity,
]

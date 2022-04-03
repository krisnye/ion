import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { syntacticChecks } from "./syntacticChecks";
import { opsToNodes } from "./opsToNodes";
import { flattenSequences } from "./flattenSequences";
import { identity } from "./identity";
import { removeSoloBlocks } from "./removeSoloBlocks";
import { resolveExternalReferences } from "./resolveExternalReferences";
import { simplify } from "./simplify";

export const soloPhases: Phase[] = [
    tokenization,
    parsing,
    syntacticChecks,
    opsToNodes,
    removeSoloBlocks,
    flattenSequences,
    resolveExternalReferences,
    //  MUST be solo up to this point so we can get external dependencies.

    simplify,
];

// hmmm, maybe we can keep things in solo phases... the performance will be much higher?

export const groupPhases: Phase[] = [
    identity,
]

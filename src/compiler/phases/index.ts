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
// import { createMultiFunctions } from "./createMultiFunctions";
import { removeSoloBlocks } from "./removeSoloBlocks";
import { moveMetaToFunctions } from "./moveMetaToFunctions";
import { ssaForm } from "./ssaForm";
import { removeInlineDents } from "./removeInlineDents";
import { insertConditionalAssignments } from "./insertConditionalAssignments";

export const parsingPhases: Phase[] = [
    tokenization,
    removeInlineDents,
    parsing,
    destructuringAndUnaryNumberLiterals,
    opsToTypeNodes,
    opsToValueNodes,
    removeSoloBlocks,
    flattenSequencesAddMeta,
    moveMetaToFunctions,
    // createMultiFunctions,
    resolveExternalReferences,
    insertConditionalAssignments,
    ssaForm,
    identity,
    //  MUST be solo up to this point so we can get external dependencies.
];

export const intermediatePhases: Phase[] = [
    // pstModulesToAst,
    // validateTypeDeclarations,
    // checkForUnresolvedExpressions,
];

//  move all module root functions to shared multifunctions
//  the perform more typeInference with all phases merged up
//  evaluation must happen in an assembled phase.
export const assemblyPhases: Phase[] = [
    typeInference,
    identity,
];

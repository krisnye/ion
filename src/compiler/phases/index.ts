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
import { moveMetaToFunctions } from "./moveMetaToFunctions";
import { validateTypeDeclarations } from "./validateTypeDeclarations";
import { ssaForm } from "./ssaForm";
import { ssaForm3 } from "./ssaForm3";

export const parsingPhases: Phase[] = [
    tokenization,
    parsing,
    destructuringAndUnaryNumberLiterals,
    opsToTypeNodes,
    opsToValueNodes,
    removeSoloBlocks,
    flattenSequencesAddMeta,
    moveMetaToFunctions,
    createMultiFunctions,
    resolveExternalReferences,
    // ssaForm2,
    ssaForm3,
    // ssaForm,
    //  MUST be solo up to this point so we can get external dependencies.
];

export const intermediatePhases: Phase[] = [
    pstModulesToAst,
    validateTypeDeclarations,
    typeInference,
    // checkForUnresolvedExpressions,
]

//  move all module root functions to shared multifunctions
//  the perform more typeInference with all phases merged up
//  evaluation must happen in an assembled phase.
export const assemblyPhases: Phase[] = [
    identity,
]

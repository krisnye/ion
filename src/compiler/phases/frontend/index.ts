import { Phase } from "../Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { destructuringAndUnaryNumberLiterals } from "./destructuringAndUnaryNumberLiterals";
import { opsToValueNodes as opsToValueNodes } from "./opsToValueNodes";
import { flattenSequencesAddMeta } from "./flattenSequencesAddMeta";
import { resolveExternalReferences } from "./resolveExternalReferences";
import { typeInference } from "./typeInference";
import { opsToTypeNodes } from "./opsToTypeNodes";
import { removeSoloBlocks } from "./removeSoloBlocks";
import { moveMetaToFunctions } from "./moveMetaToFunctions";
import { ssaForm } from "./ssaForm";
import { removeInlineDents } from "./removeInlineDents";
import { insertConditionalAssignments } from "./insertConditionalAssignments";
import { checkCalls } from "./checkCalls";
import { semanticChecks } from "./semanticChecks";
import { checkUFCS } from "./checkUFCS";
import addExplicitReturns from "./addExplicitReturns";
import addExport from "./addExport";

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
    addExplicitReturns,
    semanticChecks,
    addExport,
    // createMultiFunctions,
    resolveExternalReferences,
    insertConditionalAssignments,
    ssaForm,
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
    //  before type inference, fix named function calls, check all args same name, reorder names
    typeInference,
    checkCalls,
    //  some UFCS functions may not have been checked yet, so we check them now.
    checkUFCS,
];
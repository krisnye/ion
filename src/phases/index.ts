import parsing from "./parsing";
import semanticValidation from "./semanticValidation";
import importResolution from "./importResolution";
// import addIsTypeFunctions from "./addIsTypeFunctions";
import convertRefsToAbsolute from "./convertRefsToAbsolute";
import assemblyToAnalysis from "./assemblyToAnalysis";
import inheritBaseClasses from "./inheritBaseClasses";
import checkReferences from "./checkReferences";
// import normalizeTypes from "./normalizeTypes";
import addImplicitReturns from "./addImplicitReturns";
import inferTypes from "./inferTypes";
import createConditionalDeclarations from "./createConditionalDeclarations";
import removeConditionalDeclarations from "./removeConditionalDeclarations";
import addLibraryDefaultExport from "./addLibraryDefaultExport";
import addIndexModules from "./addIndexModules";
import classLetsToStatic from "./classLetsToStatic";

export default [
    // input stage
    parsing,
    semanticValidation,
    addIndexModules,
    addLibraryDefaultExport,
    importResolution,
    classLetsToStatic,
    // // addImplicitReturns,
    // // addIsTypeFunctions,
    // analysis stage
    convertRefsToAbsolute,
    assemblyToAnalysis,
    createConditionalDeclarations,
    inheritBaseClasses,
    // // normalizeTypes,
    inferTypes,
    // removeConditionalDeclarations,
    // // checkReferences,
]
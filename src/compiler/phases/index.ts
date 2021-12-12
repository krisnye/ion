import identity from "./identity"
// import instanceFunctions from "./instanceFunctions";
import semanticChecks from "./semanticChecks";
import Phase from "./Phase";
import inferTypes from "./inferTypes";
import createConditionalDeclarations from "./createConditionalDeclaration";
import builtinFunctionsToOps from "./builtinFunctionsToOps";

export default [
    // numbering,
    // instanceFunctions,
    semanticChecks,
    builtinFunctionsToOps,
    createConditionalDeclarations,
    inferTypes,
    identity,
] as Phase[]

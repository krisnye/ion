import identity from "./identity"
// import instanceFunctions from "./instanceFunctions";
import semanticChecks from "./semanticChecks";
import Phase from "./Phase";
import inferTypes from "./inferTypes";

export default [
    // numbering,
    // instanceFunctions,
    semanticChecks,
    inferTypes,
    identity,
] as Phase[]

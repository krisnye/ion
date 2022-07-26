import { identity } from "../../identity";
import { Phase } from "../../Phase";
import { addImportsRenameLocals } from "./addImportsRenameLocal";
import { removeCompileTimeTypes } from "./removeCompileTimeTypes";
import { toESTree } from "./toESTree";
import { toJavascript } from "./toJavascript";

export const javascriptPhases: Phase[] = [
    // must replace native calls before removing compile time types.
    // addNativeCalls,
//    removeCompileTimeTypes,
    addImportsRenameLocals,
    toESTree,
    toJavascript,
    identity,
];

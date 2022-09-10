import { removeSoloBlocks } from "../../frontend/removeSoloBlocks";
import { identity } from "../../identity";
import { Phase } from "../../Phase";
import { addImports } from "./addImports";
import { renameExternals } from "./renameExternals";
import { renameLocals } from "./renameLocals";
import { toESTree } from "./toESTree";
import { toJavascript } from "./toJavascript";
import { toRuntimeTypes } from "./toRuntimeTypes";

export const javascriptPhases: Phase[] = [
    // must replace native calls before removing compile time types.
    // addNativeCalls,
    renameLocals,
    addImports,
    renameExternals,
    removeSoloBlocks,
    //  type information is retained because it's needed by Call.toESNode
    //  to determine possibleTypes. This should probably be figured out earlier.
    //  so that we can remove the types sooner.
    toRuntimeTypes,
    toESTree,
    toJavascript,
    identity,
];

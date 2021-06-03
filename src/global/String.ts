import { is as isSymbol } from "../symbols"

String[isSymbol] = function(a) {
    return typeof a === "string";
};

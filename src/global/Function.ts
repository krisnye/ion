import { is as isSymbol } from "../symbols"

Function[isSymbol] = function(a) {
    return typeof a === "function";
};
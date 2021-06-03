import { is as isSymbol } from "../symbols";

Boolean[isSymbol] = function(a) {
    return typeof a === "boolean";
};
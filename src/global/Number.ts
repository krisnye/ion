import { is as isSymbol } from "../symbols";

Number[isSymbol] = function(a) {
    return typeof a === "number";
};

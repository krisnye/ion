import { is as isSymbol } from "../symbols"

RegExp.prototype[isSymbol] = function(this: RegExp, a) {
    return a != null && this.test(a);
};

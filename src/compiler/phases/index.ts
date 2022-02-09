import { Options } from "../Compiler";
import { parsing } from "./parsing";
import { tokenization } from "./tokenization";

type Phase = (moduleName: string, module: any, options: Options) => any;

export const lexical: Phase[] = [
    tokenization,
    parsing,
];

import { CompilerOptions } from "../Compiler";

export type Phase = (moduleName: string, module: any, options: CompilerOptions) => [any, Error[]];

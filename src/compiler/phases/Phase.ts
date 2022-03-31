import { CompilerOptions } from "../Compiler";

export type Phase = (moduleName: string, module: any, externals: Map<string,any>, options: CompilerOptions) => [any, Error[]];

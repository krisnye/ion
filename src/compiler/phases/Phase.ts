
import { Module } from "../ast";
import { Options } from "../Compiler"

type Phase = (
    module: Module,
    options: Options,
    dependencies?: Map<string,any>,
) => Module | Error[]

export default Phase
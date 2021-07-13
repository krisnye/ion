
import { Module } from "../ast";
import { Options } from "../Compiler"

type Phase = (
    module: Module,
    externals: Map<string,Module>,
    options: Options
) => Module | Error[]

export default Phase
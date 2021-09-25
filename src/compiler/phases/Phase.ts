
import { Module } from "../ast";
import { Options } from "../Compiler"

type Phase = (
    module: Module,
    options: Options
) => Module | Error[]

export default Phase
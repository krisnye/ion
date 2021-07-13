import { traverse } from "@glas/traverse";
import { Module } from "../ast";
import { Options } from "../Compiler"

export default function identity(
    module: Module,
    externals: Map<string,Module>,
    options: Options
): Module | Error[] {
    return module
}

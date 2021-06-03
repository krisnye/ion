import { join } from "path";
import { write } from "../common";
import { Options } from "../Compiler";
import Output from "../ast/Output";

export default function writeFiles(output: Output, options: Options) {
    for (let path of output.files.keys()) {
        let content = output.files.get(path) as string
        write(join(options.output, path), content)
    }
    return null
}
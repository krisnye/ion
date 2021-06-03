import Assembly from "../ast/Assembly";
import { Options } from "../Compiler";

export default function parsing(root: { [name: string]: string }, options: Options) {
    let modules = new Map<string, any>()
    for (let name in root) {
        let source = root[name]
        let module = options.parser.parse(source, name)
        modules.set(name, module)
    }
    return new Assembly({ modules })
}
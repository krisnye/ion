import Assembly from "../ast/Assembly";
import Module from "../ast/Module";
import Id from "../ast/Id";
import { Options } from "../Compiler";

export default function parsing(root: { [name: string]: string }, options: Options) {
    let modules = new Map<string,Module>()
    for (let name in root) {
        let source = root[name]
        let module: Module = options.parser.parse(source, name)
        modules.set(name, module)
    }
    return new Assembly({ modules })
}

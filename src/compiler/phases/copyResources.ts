import { Options } from "../Compiler";
import * as common from "../common";
import * as np from "path";

export function copyResource(path: string, fullpath: string, options: Options) {
    try {
        let content = common.read(fullpath)
        let outputPath = np.join(options.output, path)
        console.log("Writing: " + np.relative(process.cwd(), outputPath))
        common.write(outputPath, content)
    }
    catch (e) {
        console.warn(`Error copying ${path}: `, e)
    }
}

export default function copyResources(output, options: Options) {
    if (options.emit) {
        for (let root of options.inputs) {
            for (let file of common.getFilesRecursive(root)) {
                if (!file.endsWith(common.ionExt)) {
                    let fullpath = np.join(root, file)
                    // copy/write etc.
                    copyResource(file, fullpath, options)
                }
            }
        }
    }
    return output
}
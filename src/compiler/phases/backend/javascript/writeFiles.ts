import { split } from "../../../pathFunctions";
import { Phase } from "../../Phase";
import * as nodePath from "path";
import { write } from "../../../common";

function moduleNameToFilename(outputDirectory: string, moduleName: string) {
    return nodePath.join(outputDirectory, ...split(moduleName)) + ".mjs";
}

export function writeFiles(moduleName, module, externals): ReturnType<Phase> {
    const outputDirectory = "./lib/ion/";
    const filename = moduleNameToFilename(outputDirectory, moduleName);
    write(filename, module);
    return [module, []];
}

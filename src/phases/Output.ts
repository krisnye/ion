import * as common from "../common"
import * as ast from "../IonAst"

const File_Write = (node:ast.File) => {
    console.log('Writing ' + node.path)
    // This was causing nodemon to run over and over; so I added the .out extension to keep it from restarting.
    common.write(node.path, node.content, node.encoding)
}

export const passes = [
    [File_Write]
]

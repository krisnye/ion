import * as common from "../common"

const File_Write = (node:any) => {
    console.log('Writing ' + node.path)
    // This was causing nodemon to run over and over; so I added the .out extension to keep it from restarting.
    common.write(node.path + '.out', node.content, node.encoding)
}

export const passes = [
    [File_Write]
]

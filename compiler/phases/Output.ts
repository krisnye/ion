import * as common from "../common"

const File_Write = (node:any) => {
    console.log('Writing ' + node.path)
    common.write(node.path, node.content, node.encoding)
}

export const passes = [
    [File_Write]
]

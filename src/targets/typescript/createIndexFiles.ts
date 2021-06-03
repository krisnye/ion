import Output from "../../ast/Output";

export default function createIndexFiles(root: Output) {
    let folders = new Map<string, Array<string>>()
    for (let path of root.files.keys()) {
        let steps = path.split('.')
        let parent = steps.slice(0, -1).join('.')
        let name = steps[steps.length - 1]
        let folder = folders.get(parent)
        if (folder == null) {
            folders.set(parent, folder = []);
        }
        folder.push(name)
    }
    let newFiles = new Map<string,string>()
    for (let folder of folders.keys()) {
        let path = folder + ".index"
        let children = folders.get(folder)!
        newFiles.set(path, {
            type: "Program",
            body: children.map(child => {
                let hasDefaultExport = child[0] === child[0].toUpperCase()
                let localName = "_" + child
                return hasDefaultExport ?
                    {
                        type: "ExportNamedDeclaration",
                        specifiers: [{
                            type: "ExportSpecifier",
                            local: { type: "Identifier", name: "default" },
                            exported: { type: "Identifier", name: child }
                        }],
                        source: { type: "Literal", value: `./${child}` }
                    }
                    : [
                        {
                            type: "ImportDeclaration",
                            specifiers: [
                                {
                                    type: "ImportNamespaceSpecifier",
                                    local: { type: "Identifier", name: localName }
                                }
                            ],
                            source: { type: "Literal", value: `./${child}` }
                        },
                        {
                            type: "ExportNamedDeclaration",
                            declaration: {
                                type: "VariableDeclaration",
                                kind: "const",
                                declarations: [
                                    {
                                        type: "VariableDeclarator",
                                        id: { type: "Identifier", name: child },
                                        init: { type: "Identifier", name: localName }
                                    }
                                ]
                            }
                        }
                    ]
            }).flat()
        } as any)
    }

    return new Output({ files: new Map([...root.files.entries(), ...newFiles.entries() ])})

}
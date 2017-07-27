import * as common from "./common"
const Diff: any = require("text-diff")
const diff: any = new Diff()

export function create(outputPath: string) {
    let passes: [string,string][] = []
    return function(name: string, ast: object) {
        if (name != null) {
            passes.push([name, JSON.stringify(ast, null, 2)])
        } else {
            // convert to HTML
            let previous: string | null = null
            let html = [
`
<html>
    <head>
        <meta http-equiv="refresh" content="1">
        <style>
        :root {
            --border: solid 1px gray;
        }

        body {
            display: flex;
            flex-direction: row;
            font-size: 16px;
        }
        article {
            border: var(--border);
            color: rgb(207,145,118);
            color: rgb(83,155,216);
            background: rgb(30,30,30);
        }
        article {
            border: var(--border);
            padding: 0px;
        }
        article:not(:last-child) {
            border-right: none;
        }
        article header {
            color: rgb(150,150,150);
            background-color: rgb(45,45,45);
            font-weight: bold;
            padding: 8px;
            margin: 0px;
            border-bottom: var(--border);
        }
        article p {
            padding: 0px 8px;
            white-space: pre;
        }
        ins {
            color: lightgreen;
            text-decoration: none;
        }
        del {
            color: red;
            text-decoration: none;
        }
        </style>
    </head>
    <body>
`,
...passes.map(([name, text]: any) => {
    let save = text
    if (previous != null) {
        var textDiff = diff.main(previous, text)
        text = diff.prettyHtml(textDiff)
    }
    previous = save
    return `
        <article>
            <header>${name}</header>
            <p>${text}</p>
        </article>
    `
}),
`
    </body>
</html>
`
            ].join('')
            common.write(outputPath, html)
            console.log('debug written to ', outputPath)
        }
    }
}
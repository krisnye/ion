import * as common from "./common"
const jsondiffpatch: any = require('jsondiffpatch').create({})

export function create(outputPath: string) {
    let passes: [string,object][] = []
    return function(name: string, ast: object) {
        if (name != null) {
            passes.push([name, JSON.parse(JSON.stringify(ast))])
        } else {
            // convert to HTML
            let previous: string | null = null
            let html = [
`
<html>
    <head>
        <meta http-equiv="refresh" content="1">
        <link rel="stylesheet" href="../../../node_modules/jsondiffpatch/public/formatters-styles/html.css" type="text/css" />
        <style>
        :root {
            --border: solid 1px gray;
        }
        body {
            display: flex;
            flex-direction: row;
            font-size: 12px;
            font-family: Monaco;
        }
        article {
            border: var(--border);
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
...passes.map(([name, ast]: any) => {
    let delta = previous != null ? jsondiffpatch.diff(previous, ast) : null
    let html = require('jsondiffpatch/src/formatters/html').format(delta || {}, previous || ast)
    previous = ast
    return `
        <article>
            <header>${name}</header>
            <p>${html}</p>
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
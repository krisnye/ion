import * as common from "./common"
import { readFileSync } from "fs";

const jsondiffpatch: any = require('jsondiffpatch').create({})
const remove__prefixedProperties = (key: string, value:any) => key.startsWith("__") ? undefined : value
const uniqueId = Symbol('uniqueId')
const ignoreProperties: {[name:string]:boolean} = {
    location: true
}

function isEmpty(value) {
    return value == null || value === false || value.length === 0
}

function ignore(property, value, object) {
    if (isEmpty(value)) {
        return true
    }
    return ignoreProperties[property] || property.startsWith("_") || /^\/ion\b/.test(property)
}

export function stringify(object, indent = 2) {
    return JSON.stringify(cloneWithJsonReferences(object), null, indent);
}

function cloneWithJsonReferences(object: any, path: string[] = []) {
    let type = typeof object
    if (object == null || type == 'string' || type == 'number' || type == 'boolean')
        return object
    let className = object.constructor.path || object.constructor.name
    
    if (object.toJSON)
        object = object.toJSON()
    let clone: any = Array.isArray(object) ? [] : className === "Object" ? {} : {"": className}
    if (object instanceof Map) {
        for (let key of object.keys()) {
            let value = object.get(key)
            if (ignore(key, value, object)) {
                continue
            }
            clone[key] = cloneWithJsonReferences(value, path)
        }
    }
    if (object instanceof Set) {
        let index = 0
        for (let value of object.values()) {
            clone[index++] = cloneWithJsonReferences(value, path)
        }
    }
    else {
        for (let property in object) {
            let value = object[property]
            if (ignore(property, value, object)) {
                continue
            }
    
            path.push(property)
            clone[property] = cloneWithJsonReferences(value, path)
            path.pop()
        }
    }
    return clone
}

function format(html: string) {
    //  replace { "": "TypeName" ... } with TypeName { ... }
    return html.replace(/{\s+&quot;&quot;:\s+&quot;(\w+)&quot;,/gi, "$1 {")
        //  replace multiline object with a single value as a single line
        .replace(/{\s+([^\n]+)\s+}/gi, "{ $1 }")
        //  replace multiline object with two values as a single line
        .replace(/{\s+([^\n]+)\s+([^\n]+)\s+}/gi, "{ $1 $2 }")
        //  replace line ends with breaks
        .replace(/\\n/g, '<br>')
}

function diff(before, after, channel) {
    let delta = before != null ? jsondiffpatch.diff(before, after) : null
    let html: any = null;
    if (typeof after === "string") {
        if (typeof before === "string") {
            var ghDiffHTML = require('gh-diff-html')
            html = ghDiffHTML(before, after, {
                drawFileList: false,
                fileName: "_",
                outputFormat: 'line-by-line' // or 'side-by-side'
            })
        }
        else {
            html = after
        }
    }
    else {
        html = require('jsondiffpatch/src/formatters/html').format(delta || {}, before || after)
    }
    return format(html);
}

export function create(outputPath: string) {
    let stylePaths = [
        require.resolve("jsondiffpatch/public/formatters-styles/html.css"),
        require.resolve("diff2html/dist/diff2html.min.css"),
    ]
    let rfs = readFileSync // abstraction to prevent parcel from resolving
    let styles = stylePaths.map(stylePath => rfs(stylePath))
    // console.log(style)
    // let outputToStyle = np.relative(np.dirname(outputPath), "node_modules/jsondiffpatch/dist/formatters-styles/html.css")
    let channels: Map<string,[string[],object][]> = new Map()
    let passes: [string[],object][] = []
    return function(names?: string | string[] | null, ast?: any, channel?: string) {
        if (names != null) {
            if (!Array.isArray(names))
                names = [names]
            let passes = channels.get(channel!)
            if (passes == null) {
                channels.set(channel!, passes = [])
            }
            passes.push([names, cloneWithJsonReferences(ast)])
            // passes.push([names, JSON.parse(JSON.stringify(cloneWithJsonReferences(ast), remove__prefixedProperties))])
        } else {
            // convert to HTML
            let previous: string | null = null
            let keys = ast || Array.from(channels.keys());
            let html = [
`
<html>
    <head>
        <style>
        ${styles.join("")}
        </style>
        <style>
        /* begin diff2html styles */
        .d2h-file-header {
            display: none;
        }
        /* end diff2html styles */
        :root {
            --border: solid 1px gray;
        }
        body {
        }
        .main {
            display: flex;
            flex-direction: column;
        }
        .channel {
            display: flex;
            flex-direction: row;
            font-size: 12px;
            font-family: Monaco;
            position: relative;
        }
        .channel > td {
            border: var(--border);
        }
        .channel > td:nth-child(1) > .content {
            font-size: 16px;
            writing-mode: tb-rl;
            padding: 12px;
        }
        .channel > td {
            border: var(--border);
            padding: 0px;
        }
        .channel > td:not(:last-child) {
            border-right: none;
        }
        .channel > td header {
            color: rgb(150,150,150);
            background-color: rgb(45,45,45);
            font-weight: bold;
            padding: 8px;
            margin: 0px;
            border-bottom: var(--border);
        }
        .channel > td header:hover {
            display: flex;
            flex-direction: column;
        }
        .channel > td p {
            padding: 0px 8px;
            white-space: pre;
        }
        .channel > td > div {
            display: flex !important;
            flex-direction: column;
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
    <body onclick="location.reload(true)">
        <table class="main">
`,
...keys.map(channel => {
    let passes = channels.get(channel)!;
    return [
        `<tr class="channel">
            <td>
                <header><span>File</span></header>
                <span class="content">
                    ${channel}
                </span>
            </td>
        `,
        ...passes.map(([names, ast]: any) => {
            if (!Array.isArray(names))
                names = [names]
            // convert to show refs
            let delta = diff(previous, ast, channel)
            previous = ast
            return `
                <td>
                    <header><span>${names.join(', </span><span>')}</span></header>
                    <p>${delta}</p>
                </td>
            `
        }),
        `</tr>`
    ].join('')
}),
`
        </div>
    </body>
</html>
`
            ].join('')
            common.write(outputPath, html)
            console.log('debug written to ', outputPath)
        }
    }
}
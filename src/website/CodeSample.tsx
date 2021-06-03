import React, { useMemo, useState } from "react"
import { compileSample } from "../compiler/Compiler";
import CodeEditor from "./CodeEditor";
import "./CodeSample.css"
import CodeViewer from "./CodeViewer";

export default function CodeSample(props: { description: string, children: string}) {
    let [content, setContent] = useState(props.children);
    let onInput = useMemo(() => {
        return (e) => {
            setContent((e.target as any).innerText)
        }
    }, [])

    let javascript = compileSample(content, "sample", true)
    let isError = typeof javascript !== "string"

    return (
        <div className="CodeSample">
            <div className="description">{ props.description }</div>
            <div className="samples">
                <CodeEditor onInput={onInput}>{ props.children }</CodeEditor>
                <CodeViewer source={content} debug={true} />
                <CodeViewer source={content} debug={false} />
            </div>
        </div>
    )

}
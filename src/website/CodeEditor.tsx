import React, { memo, useState } from "react"
import { compileSample } from "../compiler/Compiler";
import TopLabel from "./TopLabel";
import "./Code.css";

function insertTextAtCursor(text)
{
    let selection = window.getSelection() as any;
    let range = selection.getRangeAt(0);
    range.deleteContents();
    let node = document.createTextNode(text);
    range.insertNode(node);

    for(let position = 0; position != text.length; position++)
    {
        selection.modify("move", "right", "character");
    };
}

export default memo(function CodeEditor(props: { children: string, onInput }) {
    let { children, ...other } = props
    return (
        <div { ...other } className="Code ionscript">
            <div
                contentEditable
                suppressContentEditableWarning
                style={{ border: "none", outline: "none" }}
                onKeyDown={(e) => {
                    if (e.key === "Tab") {
                        console.log("insert 4 spaces")
                        insertTextAtCursor("    ")
                        e.stopPropagation()
                        e.preventDefault()
                    }
                }}
            >{ children }</div>
            <TopLabel>IonScript</TopLabel>
        </div>
    )
})
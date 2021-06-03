import React, { memo, useState } from "react"
import { compileSample } from "../compiler/Compiler";
import TopLabel from "./TopLabel";
import "./Code.css";
import highlight from 'highlight-javascript-syntax';

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

export default memo(function CodeEditor(props: { source: string, debug: boolean }) {
    let { source, debug, ...other } = props

    let javascript = compileSample(source, "sample", debug)
    let isError = typeof javascript !== "string"
    let content = isError ? javascript.toString() : javascript.toString()

    return (
        <div { ...other } className="Code javascript"><div dangerouslySetInnerHTML={{__html:content}}></div><TopLabel>{ debug ? "JavaScript Debug" : "JavaScript Release" }</TopLabel></div>
    )
})
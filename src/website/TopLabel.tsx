import React, { memo, useState } from "react"
import "./TopLabel.css"

export default memo(function TopLabel(props: { children: string }) {
    let { children, ...other } = props
    return (
        <div { ...other } className="TopLabel">{ children }</div>
    )
})
import React from 'react'
import {useNavigate} from 'react-router-dom'

function LinkChanger({text, linktext, link}) {
    const navigate = useNavigate()
    return (
        <div style={{marginTop: "2rem"}}>
            <span style={{ marginRight: "10px" }}>{text}</span>
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate(link)}>
                {linktext}
            </span>
        </div>
    )
}

export default LinkChanger

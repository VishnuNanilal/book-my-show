import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LinkButton({ name, navlink }) {

    const navigate = useNavigate()
    function handleClick() {
        navigate(navlink)
    }
    return (
        <div className='link-btn' onClick={handleClick}>{name}</div>
    )
}

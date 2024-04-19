/*
    A display of logo
    functionality: none
*/

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo(){
    const navigate = useNavigate()
    function handleClick(){
        navigate('/')
    }

    return (
        <img className='logo' src="logo3.jpg" alt="logo" onClick={handleClick}/>
    )
}

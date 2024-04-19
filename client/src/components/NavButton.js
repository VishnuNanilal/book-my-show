import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavButton({label, navlink, styleClass}) {
    const navigate = useNavigate()

    function handleClick(){
        navigate(navlink)
    }
  return (
    <button className= {`${styleClass}`} onClick={handleClick}>{label}</button>
  )
}

export default NavButton
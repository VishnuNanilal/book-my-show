import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function NavBar({setMovieModal, setTheaterModal, setShowModal, disabled}) {
  const navigate = useNavigate()
  const dis = disabled.movieModal || disabled.theaterModal || disabled.showModal;
  let btnStyle= dis ? {backgroundColor: "green"} : {}

  return (
    <div className='nav-bar' style={{height: "5rem"}}>
        <button onClick={()=>setMovieModal(true)} disabled={dis} style={btnStyle}>Add Movie</button>
        <button onClick={()=>setTheaterModal(true)} disabled={dis} style={btnStyle}>Add Theater</button>
        <button onClick={()=>navigate('./show')} disabled={dis} style={btnStyle}>Add Show</button>
    </div>
  )
}

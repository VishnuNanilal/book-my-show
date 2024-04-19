import React, { useEffect, useRef } from 'react'
import NavButton from './NavButton'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../redux/userSlice'

export default function MenuContainer({ showSettings, setShowSettings }) {
  const navigate = useNavigate()
  const settingsRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  useEffect(() => {
    if (showSettings) {
      settingsRef.current.classList.add("show-menu")
    }
    else{
      settingsRef.current.style.remove("show-menu")
    }
  }, [showSettings])

  function handleSignOut(){
    localStorage.removeItem('jwt')
    dispatch(removeUser())
    navigate('/sign-in')
  }

  return (
    <div className='menu-cont' ref={settingsRef}>
      <button className='exit-btn' onClick={() => setShowSettings(false)}>X</button>
      <div className='menu-center'>
        <div><NavButton styleClass={"menu-btn"} label={"Profile"} navlink={"/profile"} /></div>
        <div><NavButton styleClass={"menu-btn"} label={"Bookings"} navlink={"/bookings"} /></div>
        <div><NavButton styleClass={"menu-btn"} label={"Business"} navlink={"/business"} /></div>
        {
          user.isAdmin &&
          <div><NavButton styleClass={"menu-btn"} label={"Show Requests"} navlink={"/show-requests-approval"} /></div>
        }
        <div><button className="menu-btn" onClick={handleSignOut}>Sign Out</button></div>
      </div>
    </div>
  )
}

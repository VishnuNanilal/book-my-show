/*
    top navbar
    functionality: none
*/

import './Header.css'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Logo from './Logo'
import NavButton from '../NavButton'
import MenuContainer from '../MenuContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const [showSettings, setShowSettings] = useState(false)
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    let profile_pic_url = user.profile_pic ? `http://localhost:3001/uploads/${user.profile_pic}`:`default_profile_pic.jpg`
    console.log(">>>", profile_pic_url)
    return (
        <header className='header-center'>
            <div className='header-center-left'>
                <Logo />
                <SearchBar />
            </div>
            <div className='header-center-right'>
                <NavButton label={user.place} navlink={'/place'} styleClass="nav-link place-btn"/>
                <div>
                <img src={profile_pic_url} alt="profile img" className='profile-pic nav-link profile-btn' onClick={()=>{navigate('/profile')}}/>
                </div>
                <FontAwesomeIcon className="settings-btn" onClick={()=>setShowSettings(true)} icon={faBars} /> 
                {
                    showSettings &&
                    <MenuContainer showSettings={showSettings} setShowSettings={setShowSettings}/>
                }
            </div>
        </header>
    )
}
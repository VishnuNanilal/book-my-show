import React from 'react'
import './components.css'
import { useSelector } from 'react-redux'

function ShowInPlaceHeader({showtype}) {
  const user = useSelector(state=>state.user)
  return (
    <div className='show-in-place-header'>{showtype} in {user.place}</div>
  )
}

export default ShowInPlaceHeader
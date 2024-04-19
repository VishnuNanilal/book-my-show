import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TheaterDetails({payload}) {
    let navigate = useNavigate()
    let {_id, name, location, timings, price} = payload
    // console.log('>>>', _id)
    
    function handleClick(time){
      navigate(`./book-show/${_id}/${time}`)
    }

  return (
    <div className='theater-details'>
        <h3>{name}</h3>
        <div>{location}</div>
        <hr></hr>
        <div className='timing-cont'>
        {
            timings.map(timing=><div className='good-btn' onClick={()=>handleClick(timing.time)}>{timing.time}</div>)
        }
        </div>
    </div>
  )
}

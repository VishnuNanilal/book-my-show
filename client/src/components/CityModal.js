import React from 'react'
import cities from './cities'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { UpdateUserSetPlaceAPI } from '../api/user'
import { useNavigate } from 'react-router-dom'

export default function CityModal() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.user)
    
    async function handleSetCity(city){
        console.log(user._id)
        let response = await UpdateUserSetPlaceAPI(user._id, city)
        dispatch(setUser(response.data))
        navigate('/home')
    }

    return (
        <div className='city-cont'>
            {
                cities.map(city => <button className='city-btn' onClick={()=>handleSetCity(city)}>{city}</button>)
            }
        </div>
    )
}

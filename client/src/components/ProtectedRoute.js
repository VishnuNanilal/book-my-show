import React, { useState, useEffect } from 'react'
import { AuthorizeUser } from '../api/user'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from  'react-redux'
import {setUser, removeUser} from '../redux/userSlice'
import IsLoading from './IsLoading'

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let token = localStorage.getItem('jwt')
        if(!token){
            dispatch(removeUser())
            navigate('/sign-in')
        }
        else{
            async function handleUserAuthorization(){
                let response = await AuthorizeUser()
                // console.log('User data after auth', response.data)
                if(response.success){
                    dispatch(setUser(response.data))
                    setIsLoading(false)
                }
                else{
                    localStorage.removeItem('jwt')
                    dispatch(removeUser())
                    navigate('/sign-in')
                }
            }
            handleUserAuthorization()
        }
    }, [dispatch, navigate])

    return (
        <div>
            {
                isLoading ?
                <IsLoading/>
                :
                children
            }
        </div>
    )
}

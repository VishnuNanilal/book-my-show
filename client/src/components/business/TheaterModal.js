import React,{useState, useEffect} from 'react'
import LabelAndInput from '../LabelAndInput'
import { AddTheaterAPI, EditTheaterAPI } from '../../api/theater'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserData, UpdateUserAddTheaterAPI } from '../../api/user'
import { setUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function TheaterModal({setTheaterModal, modalType='create', payload}) {
    
    let user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(modalType==='create' ? {
        name: "",
        location: "",
        userId: user._id,
        screen_num: 0,
        seat_num: 0,
        timings: [],
        price: 0
    }:payload.selectedTheater)

    console.log("xx===>", formData)
    
    useEffect(()=>{
        navigate('/business')
    }, [navigate])

    async function handleSubmit(e){
        e.preventDefault()
        if(formData.timings.length===0){
            alert("Add minimum one timing for theater")
            return
        }

        if(modalType==='create'){
            e.preventDefault()
            formData.timings = formData.timings.map((timing)=>({
                time: timing,
                bookedSeats: []
            }))
            let response = await AddTheaterAPI(formData)
            console.log(response.message)
            if(response.success){
                //add movie id to current user's theaterList
                response = await UpdateUserAddTheaterAPI(user._id, response.data._id)
                dispatch(setUser(response.data))
            }
            console.log(response.message)
        }
        else{
            //formData = {_id: '65fa9f6f7956a7c68b74ecfd', name: 'Newesttttt Theater', location: 'Trivandrum', 
            //userId: '65fa9b8e7956a7c68b74ec95', screen_num: 12, …}
            let response = await EditTheaterAPI(payload.selectedTheater._id, formData)
            console.log(">>>>", response)
            if (response.success) {
                response = await GetUserData(payload.userid)
                dispatch(setUser(response.data))
            }
            console.log(response.message)
        }
        setTheaterModal(false)
    }

    function handleTimings(e, ind){
        let newTimings = formData.timings
        newTimings[ind] = e.target.value
        setFormData(prev=>({...prev, timings: newTimings}))
    }

    return (
        <form className='modal' onSubmit={handleSubmit}>
            <button className="modal-close-btn exit-btn" onClick={() => setTheaterModal(false)}>X</button>
            
            <LabelAndInput 
            label="Name: " name="name" placeholder="name" type="text" 
            state={{formData, setFormData}} required={true} defaultValue={formData.name}/>
            
            <LabelAndInput 
            label="Location: " name="location" placeholder="location" type="text" 
            state={{formData, setFormData}} required={true} defaultValue={formData.location}/>
            
            <LabelAndInput 
            label="Screen#: " name="screen_num" placeholder="screen number" type="number" 
            state={{formData, setFormData}} required={true} defaultValue={formData.screen_num} min={0}/>

            <LabelAndInput 
            label="Seat#: " name="seat_num" placeholder="seat number" type="number" 
            state={{formData, setFormData}} required={true} defaultValue={formData.seat_num} min={0} max={200}/>

            <LabelAndInput label="Timings:  " state={{formData, setFormData}} className="theater-timing-cont">
                <input className="theater-timing" placeholder='' type="text" name='timing' onChange={(e)=>handleTimings(e, 0)} value={formData.timings[0]?formData.timings[0].time: ""}/>
                <input className="theater-timing" placeholder='' type="text" name='timing' onChange={(e)=>handleTimings(e, 1)} value={formData.timings[1]?formData.timings[1].time: ""}/>
                <input className="theater-timing" placeholder='' type="text" name='timing' onChange={(e)=>handleTimings(e, 2)} value={formData.timings[2]?formData.timings[2].time: ""}/>
                <input className="theater-timing" placeholder='' type="text" name='timing' onChange={(e)=>handleTimings(e, 3)} value={formData.timings[3]?formData.timings[3].time: ""}/>
                <input className="theater-timing" placeholder='' type="text" name='timing' onChange={(e)=>handleTimings(e, 4)} value={formData.timings[4]?formData.timings[4].time: ""}/>
            </LabelAndInput>

            <LabelAndInput 
            label="Price: " name="price" placeholder="price" type="number" 
            state={{formData, setFormData}} required={true} defaultValue={formData.price} min={0} max={10000}/>

            <button className='submit-btn'>{modalType==='create' ? "Add Theater" : "Edit Theater"}</button>
        </form>
    )
}

export default TheaterModal
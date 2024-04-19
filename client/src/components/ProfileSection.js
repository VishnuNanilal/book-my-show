import React, { useState } from 'react'
import LabelAndInput from './LabelAndInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateUserDetailsAPI } from '../api/user'
import { setUser } from '../redux/userSlice'

function ProfileSection() {
  let user = useSelector(state => state.user)
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: user.email,
    dob: user.dob || "",
    profile_pic: user.profile_pic || "",
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    place: user.place || ""
  })

  const navigate = useNavigate()

  async function handleSave(e) {
    e.preventDefault()
    let response = await UpdateUserDetailsAPI(user._id, formData)
    let updatedUser = {
      ...user,
      ...formData,
      profile_pic: response.data.profile_pic
    }
    console.log(updatedUser)
    dispatch(setUser(updatedUser))
    alert(response.message)
    navigate('/')
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setFormData(prev => ({ ...prev, profile_pic: e.target.files[0] }))
  };

  return (
    <div className='profile-center'>
      <form onSubmit={handleSave} encType='multipart/form-data'>
        <button id='profile-exit-btn' onClick={() => navigate("/")}><FontAwesomeIcon icon={faArrowLeft} /></button>

        <div style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "3rem"}}>
          {image && (
            <div>
              <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '200px', objectFit: "cover", margin: "1rem", border: "3px solid var(--light1)"}} />
            </div>
          )}
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>

        <LabelAndInput label={"First Name: "} name={"first_name"} placeholder={"first name"} type={"text"} state={{ formData, setFormData }} required={true} />
        <LabelAndInput label={"Last Name: "} name={"last_name"} placeholder={"last name"} type={"text"} state={{ formData, setFormData }} required={true} />
        <LabelAndInput label={"Email: "} name={"email"} placeholder={"email"} type={"email"} state={{ formData, setFormData }} required={true} />
        <LabelAndInput label={"DOB: "} name={"dob"} placeholder={"DOB (DD/MM/YYYY)"} type={"text"} state={{ formData, setFormData }} />
        <LabelAndInput label={"Place: "} name={"place"} placeholder={"place"} type={"text"} state={{ formData, setFormData }} />
        <div style={{display:"flex",justifyContent:"center"}}>
          <button className='submit-btn'>Save changes</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileSection
import React, { useState } from 'react'
import LabelAndInput from './LabelAndInput'
import LinkChanger from './TVShows/LinkChanger'
import { SignInUser } from '../api/user'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  async function handleSubmit(e){
    e.preventDefault()
    const response = await SignInUser(formData)
    if(response.success){
      localStorage.setItem('jwt', response.data)
      navigate('/home')
    }
    alert(response.message)
  }

  return (
    <div className='main-center'>
      <form id='sign-in-modal' onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <LabelAndInput label="email " name="email" placeholder="email" type="email" state={{ formData, setFormData }} required={true} />
        <LabelAndInput label="password " name="password" placeholder="password" type="password" state={{ formData, setFormData }} required={true} />
        <LinkChanger text="Create an account" linktext="Register" link="/register" />
        <button className='submit-btn'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
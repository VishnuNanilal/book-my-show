import React, { useState } from 'react'
import LabelAndInput from './LabelAndInput'
import LinkChanger from './TVShows/LinkChanger'
import { RegisterUser } from '../api/user'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await RegisterUser(formData)
        if (response.success) {
            navigate('/sign-in')
        }
        alert(response.message)
    }

    return (
        <div className='main-center'>
            <form id='register-modal' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <LabelAndInput label="email " name='email' placeholder="email" type="email" state={{ formData, setFormData }} required={true} />
                <LabelAndInput label="password " name='password' placeholder="password" type="password" state={{ formData, setFormData }} required={true} />
                <LinkChanger text="Already have an account?" linktext="Sign In" link="/sign-in" />
                <button className='submit-btn'>Register</button>
            </form>
        </div>
    )
}

export default Register
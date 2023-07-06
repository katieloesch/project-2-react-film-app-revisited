import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import './Auth.scss'

const UpdateProfile = () => {

    const navigate = useNavigate();
    const emailRef = useRef();
    const pwRef = useRef();
    const pwConfirmRef = useRef();

    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const handlSubmit = (e) => {
        e.preventDefault();

        if (pwRef.current.value !== pwConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []

        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (pwRef.current.value) {
            promises.push(updatePassword(pwRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/dashboard')
        })
        .catch(() => (setError('Failed to update account')))
        .finally(() => setLoading(false))

    }

  return (
    <div className='update-profile-page'>    
        <div className='update-profile-form-container'>
            <h2 className='update-profile-title'>Update Profile</h2>
            <form className='update-profile-form' onSubmit={handlSubmit}>
                {error && <h2>{error}</h2>}
                <div className='input-container' id='email'>
                    <h3>Email</h3>
                    <input type='email' ref={emailRef} defaultValue={currentUser.email} required/>
                </div>
                <div className='input-container' id='password'>
                    <h3>Password</h3>
                    <input type='password' ref={pwRef} placeholder='leave blank to keep the same' />
                </div>
                <div className='input-container' id='password-confirm'>
                    <h3>Password Confirm</h3>
                    <input type='password' ref={pwConfirmRef} placeholder='leave blank to keep the same' />
                </div>
                <button className='btn btn-update-profile' disabled={loading} type='submit'>Save Changes</button>
            </form>
            <div className='dashboard-redirect'>
                <Link to='/dashboard'>Cancel</Link>
            </div>  
        </div>
    </div>
  )
}

export default UpdateProfile

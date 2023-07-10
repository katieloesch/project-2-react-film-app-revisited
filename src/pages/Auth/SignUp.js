import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.scss'
import { Link, useNavigate } from "react-router-dom";
import { createUserDataDocument } from './../../api_config/firebase';
import ContactIcons from '../../components/ContactIcons/ContactIcons';

const SignUp = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const pwRef = useRef();
    const pwConfirmRef = useRef();

    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handlSubmit = async (e) => {
        e.preventDefault();

        if (pwRef.current.value !== pwConfirmRef.current.value) {
            return setError('Passwords do not match!')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, pwRef.current.value);

            navigate('/dashboard')

        } catch (err){
            console.log(err)
            setError('Server Error - Failed to create account!')
        }

        setLoading(false)
    }

  return (
    <div className='signup-page'>
        <div className='signup-form-container'>
            <h2 className='signup-title'>Sign Up</h2>
            <form className='signup-form' onSubmit={handlSubmit}>
            {error && <h2 className='error-msg'>{error}</h2>}
                <div className='input-container' id='email'>
                    <input type='email' ref={emailRef} placeholder='email' required/>
                </div>
                <div className='input-container' id='password'>
                    <input type='password' ref={pwRef} placeholder='password' required/>
                </div>
                <div className='input-container' id='password-confirm'>
                    <input type='password' ref={pwConfirmRef} placeholder='confirm password' required/>
                </div>
                <button className='btn' disabled={loading} type='submit'>Sign Up</button>
            </form>
            <div className='login-redirect'>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </div>
      
    </div>
  )
}

export default SignUp

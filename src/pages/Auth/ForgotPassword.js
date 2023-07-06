
import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom";
import './Auth.scss';


const ForgotPassword = () => {

    const emailRef = useRef();
  
    const { resetPassword } = useAuth();
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
  
    const handlSubmit = async (e) => {
        e.preventDefault();

  
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions!')
  
  
        } catch (err){
            console.log(err)
            setError('Failed to reset password!')
        }
  
        setLoading(false)
      }
  return (
    <div className='forgot-pw-page'>
        <div className='forgot-pw-container'>
            <h2 className='forgot-pw-title'>Forgot Password?</h2>
            <form className='forgot-pw-form' onSubmit={handlSubmit}>
                {error && <h2 className='error-msg'>{error}</h2>}
                {message && <h2>{message}</h2>}
                <div className='input-container' id='email'>
                    <input type='email' ref={emailRef} placeholder='email' required/>
                </div>        
                <button className='btn' disabled={loading} type='submit'>Reset Password</button>
            </form>
            <div className='login-redirect'>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword

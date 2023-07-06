import React, { useRef, useState, useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { getUserData } from './../../api_config/firebase'; 

import './Auth.scss'

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const pwRef = useRef();

  const { login, currentUser } = useAuth();
  const { toWatchList } = useContext(FilmTvContext);

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlSubmit = async (e) => {
      e.preventDefault();

      try {
        setError('')
        setLoading(true)
        await login(emailRef.current.value, pwRef.current.value);
        navigate('/dashboard')
         


      } catch (err){
          console.log(err)
          setError('Failed to sign in!')
      }

      setLoading(false)
    }


  return (
  
    <div className='login-page'>    
        <div className='login-form-container'>
            <h2 className='login-title'>Log In</h2>
            <form className='login-form' onSubmit={handlSubmit}>
            {error && <h2 className='error-msg'>{error}</h2>}
                <div id='email' className='input-container'>
                    <input type='email' ref={emailRef} placeholder='email' required/>
                </div>
                <div id='password' className='input-container'>
                    <input type='password' ref={pwRef} placeholder='password' required/>
                </div>
                
                <button className='btn btn-login' disabled={loading} type='submit'>Log In</button>
            </form>
            <div className='signup-redirect'>
                <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                <p><Link to='/forgot-password'>Forgot Password?</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login

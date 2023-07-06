import React, { useState, useContext } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { FilmTvContext } from "./../../contexts/FilmTvContext";

import './Dashboard.scss'
import { Link, useNavigate } from "react-router-dom";
import Watched from '../Watched/Watched';

const Dashboard = () => {

  const [error, setError] = useState('')
  const { currentUser, setCurrentUser, logout } = useAuth()
  const navigate = useNavigate();
  const { toWatchList } = useContext(FilmTvContext);

  const handleLogOut = async () => {
    setError('')
    try {
      await logout()
      navigate('/login')
      currentUser.current = null
      toWatchList.current = []
      Watched.current = []
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <div className='dashboard-page'>
      <h2 className='dashboard-title'>Dashboard</h2>
     
      <div className='dashboard-container'>
        <h3>{currentUser.email}</h3>
        {error && <h2>{error}</h2>}
        <div className='btns-dashboard'>
          <button className='btn' onClick={handleLogOut}>Log Out</button>
          <button className='btn' onClick={() => (navigate('/update-profile'))}>Update Profile</button>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard

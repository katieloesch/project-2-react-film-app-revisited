import React, { useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from './../../contexts/AuthContext';
import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { navItems } from './NavItems';
import './NavBar.scss'

export default function NavBar() {
    const { toWatchList, watched } = useContext(FilmTvContext);

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate();

    const handleLogOut = async () => {
        setError('')
        try {
          await logout()
          currentUser.current = null
          toWatchList.current = []
          watched.current = []
          navigate('/login')
        } catch {
          setError('Failed to log out')
        }
      }

  return (
    <nav className='container'>
        <ul className='nav-links-list'>

            {navItems.map((navItem) => {
                let element;
                
                const navListElement = (
                    <li key={`nav-item-${navItem.name}`} className='nav-links-list-item'>
                        <Link to={navItem.link} className='nav-link'>{navItem.name}</Link>
                    </li>)

                if (navItem.display === 'always') {
                    element = navListElement
                    
                } else if (navItem.display === 'userLoggedIn' && currentUser) {
                    if (navItem.name === 'Log Out') {
                        
                        element = (<li key={`nav-item-${navItem.name}`} className='nav-links-list-item'>
                                        <Link onClick={handleLogOut} className='nav-link'>{navItem.name}</Link>
                                    </li>)
                    } else {
                        element = navListElement
                    }

                } else if (navItem.display === 'userLoggedOut' && !currentUser) {
                    element = navListElement
                }

                return element
            })}
                
        </ul>
        {error && <h2 className='error-msg'>{error}</h2>}
    </nav>
  )
}

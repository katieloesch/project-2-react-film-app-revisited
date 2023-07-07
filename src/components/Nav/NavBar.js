import React, { useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from './../../contexts/AuthContext';
import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { navItems } from './NavItems';
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import './NavBar.scss'

export default function NavBar() {

    const navigate = useNavigate();
    const { currentUser, logout } = useAuth()
    const { toWatchList, watched } = useContext(FilmTvContext);
    const [error, setError] = useState('')
    const [menuToggle, setMenuToggle] = useState(false)

    const handleLogOut = async () => {
        setError('')
        try {
          await logout()
          currentUser.current = null
          toWatchList.current = []
          watched.current = []
          setMenuToggle(false)
          navigate('/login')
        } catch {
          setError('Failed to log out')
        }
      }

  return (
    <div className='nav-container'>
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
        <div className='hamburger-container'>
            <div className='hamburger'>
                <HiMenuAlt4 onClick={() => (setMenuToggle(true))}/>
                {menuToggle && (
                    <motion.div
                        whileInView = {{x: [300, 0]}}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                        className='mobile-menu'
                    >
                        <HiX onClick={() => setMenuToggle(false)} />
                        <ul>
                        {navItems.map((navItem) => {
                            let element;
                            
                            const navListElement = (
                                <li key={`mobile-nav-item-${navItem.name}`} className='nav-links-list-item'>
                                    <Link to={navItem.link} className='nav-link' onClick={() => setMenuToggle(false)}>{navItem.name}</Link>
                                </li>)
            
                            if (navItem.display === 'always') {
                                element = navListElement
                                
                            } else if (navItem.display === 'userLoggedIn' && currentUser) {
                                if (navItem.name === 'Log Out') {
                                    
                                    element = (<li key={`mobile-nav-item-${navItem.name}`} className='nav-links-list-item'>
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
                    </motion.div>)}
            </div>
        </div>
        {error && <h2 className='error-msg'>{error}</h2>}
    </div>
  )
}

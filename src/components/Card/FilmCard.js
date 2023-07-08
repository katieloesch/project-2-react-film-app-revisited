import React, { useState, useContext } from 'react'
import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { useAuth } from "./../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import { updateUserDataDocument } from './../../api_config/firebase';
import { tmdbKey } from './../../api_config/tmdb'
import { images } from './../../assets/images'
import './Card.scss'

export default function FilmCard({ item, setToWatchListElements,  setWatchedElements }) {
  const [fetchedFilms, setFetchedFilms] = useState([])
  const navigate = useNavigate();

  const { currentUser } = useAuth()
  const { toWatchList, watched, setDetailsTitle, addNewToWatch, removeFromWatchList, checkIfonToWatchList, checkIfonWatched, selected, setSelected,
    markAsWatched, unMarkAsWatched } = useContext(FilmTvContext);
  
  const [showDeleteFromWatchList, setShowDeleteFromWatchList] = useState(checkIfonToWatchList(item))
  const [showDeleteFromWatched, setShowDeleteFromWatched] = useState(checkIfonWatched(item))
  const [checked, setChecked] = useState(false); // Initial state is false, meaning checkbox is unchecked

  function handleCheckBoxChange(e) {
    setChecked(e.target.checked)
    setSelected((selected)=>([...selected, item]))
  }


  async function handleMarkAsWatched() {
    setShowDeleteFromWatched(true)
    await markAsWatched(item)
    console.log('watched:')
    console.log(watched.current)
    
    //updating api
    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
      
  }
  async function handleUnmarkAsWatched() {
    unMarkAsWatched(item)
    setShowDeleteFromWatched(false)
    console.log('watched:')
    console.log(watched.current)
    setWatchedElements(watched.current)
  
    //updating api
    const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
  
    //re-rendering watchlist
    if (window.location.href.slice(-9) === 'watchlist') {
      console.log('on watched....')
      navigate("/watched");
  
    }
  }

  function processDate(date) {
    if (item.user_entered) {
      return date.slice(-4)
    } else {
       return date.slice(0, 4)

    }   
  }

  async function fetchFilm(){
    const res = await (await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${tmdbKey}&append_to_response=videos&language=en-US`)
    .catch(err => console.log("Error with GET request:", err)))
    .json()
    setDetailsTitle(res)
    setFetchedFilms([...fetchedFilms, res])
  }


  function handleImgClicked() {
    if (checkIfonToWatchList(item)) {
      setDetailsTitle(toWatchList.current.find(film => film.id === item.id))

    } else if (checkIfonWatched(item)) {
      setDetailsTitle(watched.current.find(film => film.id === item.id))
    } else {
      fetchFilm()
      console.log('fetched film')
    }

    navigate("/film-details");


  }


  function convertDate(american) {
    const euro = american.split('-')
    return `${euro[2]}/${euro[1]}/${euro[0]}`
  }

  async function handleAddClicked() {
    setShowDeleteFromWatchList(true)

    const newFilm = await (await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${tmdbKey}&append_to_response=videos&language=en-US`)
    .catch(err => console.log("Error with GET request:", err)))
    .json()
  
    await addNewToWatch(newFilm)

    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
      
  }

  async function handleMarkAsWatched() {
    setShowDeleteFromWatched(true)
    await markAsWatched(item)
    console.log('watched:')
    console.log(watched.current)
    
    //updating api
    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
      
  }

async function handleDeleteFromWatchlist() {
  removeFromWatchList(item)
  setShowDeleteFromWatchList(false)
  console.log('toWatchList')
  console.log(toWatchList.current)
  setToWatchListElements(toWatchList.current)

  //updating api
  const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  //re-rendering watchlist
  if (window.location.href.slice(-9) === 'watchlist') {
    console.log('on the watchlist ....')
    navigate("/watchlist");
 
  }
}
async function handleUnmarkAsWatched() {
  unMarkAsWatched(item)
  setShowDeleteFromWatched(false)
  console.log('watched:')
  console.log(watched.current)
  setWatchedElements(watched.current)

  //updating api
  const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  //re-rendering watchlist
  if (window.location.href.slice(-9) === 'watchlist') {
    console.log('on watched....')
    navigate("/watched");
 
  }
}

const imgWidth = '400'

let poster_url;

if (item.poster_path){
   poster_url = `https://image.tmdb.org/t/p/w${imgWidth}${item.poster_path}`
  } else if (item.poster_link) {
    poster_url = item.poster_link
  } else {
    poster_url = images.posterNotAvailable
  }

  return (
    <li className='film-card'>
    {(window.location.href.slice(-9) === 'watchlist' || window.location.href.slice(-7) === 'watched') && <div className='checkbox-container'><input type='checkbox' className='checkbox' id={`check-${item.id}`} checked={checked} onChange={handleCheckBoxChange}></input><label htmlFor={`check-${item.id}`}></label></div>}
      <div className='card-poster'>
        {poster_url === images.posterNotAvailable ? <img className='poster-not-available' src={images.posterNotAvailable} onClick={handleImgClicked} alt={`${item.title} poster not available`} style={{width: `${180}px; height: auto`}}/>
        : (
            <img
            className='card-poster-img'
            src={poster_url}
            alt={`${item.title} poster`}
            onClick={handleImgClicked}
            
          />)}
      </div>
      <div className='card-info'>
        <span>{item.title}&nbsp;
          {item.release_date && `(${processDate(item.release_date)})`}
        </span>       
      </div>
      <div className= 'card-btns'>
          
        {( showDeleteFromWatched) ? <button className='btn unmark-as-watched-btn' onClick={handleUnmarkAsWatched}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="white" d="M22.54 16.88L20.41 19l2.13 2.12l-1.42 1.42L19 20.41l-2.12 2.13l-1.41-1.42L17.59 19l-2.12-2.12l1.41-1.41L19 17.59l2.12-2.12l1.42 1.41M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 8c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 .5-.1 1-.23 1.43c.69-.27 1.44-.43 2.23-.43c1.12 0 2.17.32 3.07.85c.36-.58.67-1.2.93-1.85c-1.73-4.39-6-7.5-11-7.5S2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5c.35 0 .69 0 1.03-.05c-.03-.15-.03-.3-.03-.45c0-.79.16-1.54.43-2.23c-.43.13-.93.23-1.43.23Z"/></svg></button>
          : <button className='btn mark-as-watched-btn' onClick={handleMarkAsWatched}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0 8c.5 0 .97-.07 1.42-.21c-.27.71-.42 1.43-.42 2.21v.45l-1 .05c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5s9.27 3.11 11 7.5c-.25.64-.56 1.26-.92 1.85c-.9-.54-1.96-.85-3.08-.85c-.78 0-1.5.15-2.21.42c.14-.45.21-.92.21-1.42a5 5 0 0 0-5-5a5 5 0 0 0-5 5a5 5 0 0 0 5 5Z"/></svg></button>}   

        {( showDeleteFromWatchList) ? <button className='btn remove-from-to-watch-btn' onClick={handleDeleteFromWatchlist}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="#800020" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
        </button>
          : <button className='btn add-to-watch-btn' onClick={handleAddClicked}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 12 12"><path fill="black" d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75Z"/></svg>
          </button>}
    
      </div>
      
    </li>

  )
}

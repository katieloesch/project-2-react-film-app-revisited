import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext"
import { FilmTvContext } from '../../contexts/FilmTvContext'
import { updateUserDataDocument } from './../../api_config/firebase'; 

import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../../assets/images'
import Youtube from 'react-youtube'
import { getUserData } from './../../api_config/firebase'; 

import './Details.scss'



const TvDetails = () => {

  
  const { detailsTitle, toWatchList, watched, markAsWatched, unMarkAsWatched, removeFromWatchList, addNewToWatch, onWatchedList, checkIfonToWatchList, checkIfonWatched, setEditTitle } = useContext(FilmTvContext);
  const { currentUser } = useAuth()
  const [showDeleteFromWatchList, setShowDeleteFromWatchList] = useState(checkIfonToWatchList(detailsTitle))
  const [showDeleteFromWatched, setShowDeleteFromWatched] = useState(checkIfonWatched(detailsTitle))
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect In tvDetails')

    if (currentUser) {

    getUserData(currentUser.uid).then(
      (data) => {
        if (data !== null && data.watchList.length > 0) {
          toWatchList.current = data.watchList
          watched.current = data.watched
   
        } 
      }
      
    )

    console.log('useffect')
    console.log(toWatchList.current)
    }

  }, [])


  //trailer popup
  const [showTrailer, setShowTrailer] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const trailer = ((detailsTitle.videos && detailsTitle.videos.results) ? detailsTitle.videos.results.find(vid => vid.name.toLowerCase().includes('trailer')) : false)
  const trailerKey = (trailer ? trailer.key : false)
  


  //WATCHLIST CRUD
  async function handleAddToWatchListClicked() {
    setShowDeleteFromWatchList(true)
    await addNewToWatch(detailsTitle)
    console.log('toWatchList')
    console.log(toWatchList.current)
    
    //updating api
    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
      
  }

  async function handleDeleteFromWatchlist() {
    console.log('handleDeleteFromWatchlist clicked')
    removeFromWatchList(detailsTitle)
    setShowDeleteFromWatchList(false)
    console.log('toWatchList')
    console.log(toWatchList.current)
    navigate("/tv-details");
  
    //updating api
    const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
  
    //re-rendering watchlist
    if (window.location.href.slice(-12) === 'tv-details') {
    navigate("/tv-details");
    }
  }

  //WATCHED CRUD

  async function handleMarkAsWatched() {
    await markAsWatched(detailsTitle)
    setShowDeleteFromWatched(true)
    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  }

  async function handleUnmarkAsWatched() {
    await unMarkAsWatched(detailsTitle)
    setShowDeleteFromWatched(false)
    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});


  }

  function convertDate(american) {
    const euro = american.split('-')
    return `${euro[2]}/${euro[1]}/${euro[0]}`
  }

  // function processDate(date) {
  //   if (detailsTitle.user_entered) {
  //     return date.slice(-4)
  //   } else {
  //      return date.slice(0, 4)

  //   }   
  // }

const imgWidth = '400'

function handleOpenTrailer() {
    setShowTrailer(true)
    setShowOverlay(true)

  }

  function handleCloseTrailer() {
    setShowTrailer(false)
    setShowOverlay(false)

  }

  function handleEditClicked() {
    setEditTitle(detailsTitle)
    navigate('/edit-tv')
  }


  const backdrop = {
    hidden: { opacity: 0,
     },
    visible: {
        opacity: 1,
        transition: {
           
            duration: 0.7
        }
    }
}

const trailerVariants = {
  hidden: {
      opacity: 0,
      transition: {
          duration: 0.7
      }
  },
  visible: {
      opacity: 1,

      transition: {
          duration: 0.7
      }
  }
}


  return (
    <div className='tv-details-page'>
    {showOverlay &&    <motion.div
      variants={backdrop}
      initial='hidden'
      animate='visible'
      exit= 'hidden'
      className='overlay'
      />}
      {!detailsTitle ? <h1>Loading... </h1> : (
        <div className='details'>
        {/*youtube element overlay - only displays after button is clicked */}
        {showTrailer ? 
          <motion.div className='trailer-section'
          variants={trailerVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'

          >
            <button className='btn close-trailer-btn' onClick={handleCloseTrailer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 1024 1024"><path fill="white" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
            </button>
            <Youtube
              videoId={trailerKey}
            />
          </motion.div> : null}
    
        <section className='details-poster'>
          {/* tv show poster */}
          {detailsTitle.poster_path ? (
          <img
          className='details-poster-img tv'
          src={`https://image.tmdb.org/t/p/w${imgWidth}${detailsTitle.poster_path}`}
          alt={`${detailsTitle.name} poster`}
          />) : 
          <img
           className='poster-not-available tv'
           src={images.posterNotAvailable}
           alt={`${detailsTitle.name} poster not available`}
           style={{width: `${imgWidth}px`}}
           />}
    
          {/* buttons */}
          <div className= 'details-btns tv'>
           {/* toggle button - mark as watched/unwatched */}
           {(showDeleteFromWatched || checkIfonWatched(detailsTitle)) ? 
            <button className='btn unmark-as-watched-btn' onClick={handleUnmarkAsWatched}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="white" d="M22.54 16.88L20.41 19l2.13 2.12l-1.42 1.42L19 20.41l-2.12 2.13l-1.41-1.42L17.59 19l-2.12-2.12l1.41-1.41L19 17.59l2.12-2.12l1.42 1.41M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 8c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 .5-.1 1-.23 1.43c.69-.27 1.44-.43 2.23-.43c1.12 0 2.17.32 3.07.85c.36-.58.67-1.2.93-1.85c-1.73-4.39-6-7.5-11-7.5S2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5c.35 0 .69 0 1.03-.05c-.03-.15-.03-.3-.03-.45c0-.79.16-1.54.43-2.23c-.43.13-.93.23-1.43.23Z"/></svg>
              </button>
            : <button className='btn mark-as-watched-btn' onClick={handleMarkAsWatched}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0 8c.5 0 .97-.07 1.42-.21c-.27.71-.42 1.43-.42 2.21v.45l-1 .05c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5s9.27 3.11 11 7.5c-.25.64-.56 1.26-.92 1.85c-.9-.54-1.96-.85-3.08-.85c-.78 0-1.5.15-2.21.42c.14-.45.21-.92.21-1.42a5 5 0 0 0-5-5a5 5 0 0 0-5 5a5 5 0 0 0 5 5Z"/></svg>
              </button>}   
                    
            {/* toggle button - add/remove from watchlist */}

            {(showDeleteFromWatchList || checkIfonToWatchList(detailsTitle))  ?
              <button className='btn remove-from-to-watch-btn' onClick={handleDeleteFromWatchlist}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="#800020" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
              </button>
              : <button className='btn add-to-watch-btn' onClick={handleAddToWatchListClicked}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 12 12"><path fill="black" d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75Z"/></svg>
                </button>}
            
            {/* button - edit -> only visible if title saved to watchlist or watched */}
            { ((showDeleteFromWatched || checkIfonWatched(detailsTitle)) || (showDeleteFromWatchList || checkIfonToWatchList(detailsTitle))) &&  <button className='btn edit-btn' onClick={handleEditClicked}>edit</button>}

            {/* button - play trailer */}
            <button className='btn play-trailer-btn' onClick={handleOpenTrailer}>Trailer</button>

          </div>
    
        </section>

        <section className='details-text tv'>
            <div className='details-text-container'>
            <ul className='details-text-column-left'>
              <li key='title'><span className='details-title'>Title:&nbsp;</span>{detailsTitle.name}</li>
      
              {(detailsTitle.created_by&&detailsTitle.created_by.length!==0) && <li key='created-by'><ul><span className='details-title'>Created by:&nbsp;</span>{detailsTitle.created_by.map((person) => {
                return <li key={person.name}>{person.name}</li>})}
                </ul></li>}
      
      
              {detailsTitle.type && <li key='type'><span className='details-title'>Show Type:&nbsp;</span>{detailsTitle.type}</li>}
              
              
              
              {detailsTitle.tagline && <li key='tagline'><span className='details-title'>Tagline:&nbsp;</span>{detailsTitle.tagline}</li>}
              {detailsTitle.status && <li key='status'><span className='details-title'>Status:&nbsp;</span>{detailsTitle.status}</li>}
              
    
              {detailsTitle.number_of_seasons && <li key='num-seasons'><span className='details-title'>Number of Seasons:&nbsp;</span>{detailsTitle.number_of_seasons}</li>}
              {detailsTitle.number_of_episodes && <li key='num-episodes'><span className='details-title'>Number of Episodes:&nbsp;</span>{detailsTitle.number_of_episodes}</li>}
              {detailsTitle.overview && <li key='synopsis'><span className='details-title'>Synopsis:&nbsp;</span>{detailsTitle.overview}</li>}
      
              {detailsTitle.first_air_date && <li key='first-date'><span className='details-title'>First Air Date:&nbsp;</span>{convertDate(detailsTitle.first_air_date)}</li>}
              {detailsTitle.last_air_date && <li key='last-date'><span className='details-title'>Last Air Date:&nbsp;</span>{convertDate(detailsTitle.last_air_date)}</li>}
              {(detailsTitle.networks&&detailsTitle.networks.length!==0) && <li key='networks'><ul className='details-ul'><span className='details-title'>Networks:&nbsp;</span>{detailsTitle.networks.map((network) => {
                return <li className="details-li" key={network.name}>{'- '}{network.name}</li>})}
                </ul></li>}
              {detailsTitle.origin_country && <li key='og-country'><span className='details-title'>Origin Country:&nbsp;</span>{detailsTitle.origin_country}</li>}

              {(detailsTitle.production_countries&&detailsTitle.production_countries.length!==0) && <li key='prod-countries'><ul className='details-ul'><span className='details-title'>Production Countries:&nbsp;</span>{detailsTitle.production_countries.map((country) => {
                return <li className="details-li" key={country.name}>{'- '}{country.name}</li>})}
                </ul></li>}
      
          
    
                </ul>
                <ul className='details-text-column-right'>
                {(detailsTitle.genres&&detailsTitle.genres.length!==0) && <li key='genres'><ul className='details-ul'><span className='details-title'>Genres:&nbsp;</span>{detailsTitle.genres.map((genre) => {
                  return <li className="details-li" key={genre.name}>{'- '}{genre.name}</li>})}
                  </ul></li>}
                {detailsTitle.original_language && <li key='og-lang'><span className='details-title'>Original Language:&nbsp;</span>{detailsTitle.original_language}</li>}
                {(detailsTitle.spoken_languages&&detailsTitle.spoken_languages.length!==0) && <li key='spoken-lang'><ul className='details-ul'><span className='details-title'>Spoken Languages:&nbsp;</span>{detailsTitle.spoken_languages.map((lang) => {
                  return <li className="details-li" key={`spoken-${lang.name}`}>{'- '}{lang.name}</li>})}
                  </ul></li>}
                {(detailsTitle.languages&&detailsTitle.languages.length!==0) && <li key='lang'><ul className='details-ul'><span className='details-title'>Languages:&nbsp;</span>{detailsTitle.languages.map((lang) => {
                  return <li className="details-li" key={`lang-${lang.name}`}>{'- '}{lang}</li>})}
                  </ul></li>}

       
      
              {(detailsTitle.production_companies&&detailsTitle.production_companies.length!==0) && <li key='prod-companies'><ul className='details-ul'><span className='details-title'>Production Companies:&nbsp;</span>{detailsTitle.production_companies.map((company) => {
                return <li className="details-li" key={company.name}>{'- '}{company.name}</li>})}
                </ul></li>}
             
    
    
              {(detailsTitle.last_episode_to_air&&detailsTitle.last_episode_to_air.air_date) && <li key='last-episode'><ul><span className='details-title'>Last Episode to air: </span>
              {detailsTitle.last_episode_to_air.name && <li key='last-name'>Title: {detailsTitle.last_episode_to_air.name}</li>}
              {detailsTitle.last_episode_to_air.season_number && <li key='last-ep-season'>Season {detailsTitle.last_episode_to_air.season_number}</li>}
              {detailsTitle.last_episode_to_air.episode_number && <li key='last-ep'>Episode {detailsTitle.last_episode_to_air.episode_number}</li>}
              {detailsTitle.last_episode_to_air.air_date && <li key='last-ep-air-date'>Air Date: {convertDate(detailsTitle.last_episode_to_air.air_date)}</li>}
              {detailsTitle.last_episode_to_air.runtime && <li key='last-ep-runtime'>Runtime: {detailsTitle.last_episode_to_air.runtime} mins</li>}
              {detailsTitle.last_episode_to_air.overview && <li key='last-synopsis'>Synopsis: {detailsTitle.last_episode_to_air.overview}</li>}
              </ul></li>}
    
          </ul>
         

            </div>
          
        </section>
      </div>
          


      )}
    
      
    </div>
  )
}

export default TvDetails

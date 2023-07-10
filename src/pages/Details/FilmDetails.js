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


const FilmDetails = () => {

  
  const { detailsTitle, toWatchList, watched, markAsWatched, unMarkAsWatched, removeFromWatchList, addNewToWatch, onWatchedList, checkIfonToWatchList, checkIfonWatched, setEditTitle } = useContext(FilmTvContext);
  const { currentUser } = useAuth()
  const [showDeleteFromWatchList, setShowDeleteFromWatchList] = useState(checkIfonToWatchList(detailsTitle))
  const [showDeleteFromWatched, setShowDeleteFromWatched] = useState(checkIfonWatched(detailsTitle))
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect In filmDetails')

    if (currentUser) {

      getUserData(currentUser.uid).then(
        (data) => {
          if (data !== null && data.watchList.length > 0) {
            toWatchList.current = data.watchList
            watched.current = data.watched
          
          } 
        }
        
      )
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
    //updating api
    await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
      
  }

  async function handleDeleteFromWatchlist() {
    removeFromWatchList(detailsTitle)
    setShowDeleteFromWatchList(false)
  
    //updating api
    const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current});
  
    //re-rendering watchlist
    if (window.location.href.slice(-12) === 'film-details') {
    navigate("/film-details");
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

    if (detailsTitle.production_companies[0].name) {
      detailsTitle.production_companies = detailsTitle.production_companies.map((item) => item.name)
    }
   setEditTitle(detailsTitle)
   navigate('/edit-film')
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
    <div className='film-details-page'>
    {showOverlay &&    <motion.div
      variants={backdrop}
      initial='hidden'
      animate='visible'
      exit= 'hidden'
      className='overlay'
      />}
 
        { !detailsTitle 
            ? <h2>Loading...</h2> 
            : ( <section className='details'>
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
                <AnimatePresence mode='wait' onExitComplete={() => setShowTrailer(false)}>
             
                </AnimatePresence>
                </motion.div> : null}
                    <section className='details-poster'>
                        {/* film poster */}
                        {detailsTitle.poster_path ? (
                        <img
                        className='details-poster-img'
                        src={`https://image.tmdb.org/t/p/w${imgWidth}${detailsTitle.poster_path}`}
                        alt={`${detailsTitle.title} poster`}
                        />)
                        : (detailsTitle.poster_link ? 
                          <img
                        className='details-poster-img'
                        src={`${detailsTitle.poster_link}`}
                        alt={`${detailsTitle.title} poster`}
                        /> : <img
                        className='poster-not-available'
                        src={images.posterNotAvailable}
                        alt={`${detailsTitle.title} poster not available`}
                        style={{width: `${imgWidth}px`}}
                        />)}

                        {/* buttons */}
                        <div className= 'details-btns'>
                          
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

                <section className='details-text'>
                    <div className='details-text-container'>
                        <ul className='details-text-column-left'>
                            <li key='title'><span className='details-title'>Title:&nbsp;</span>{detailsTitle.title}</li>
                            {detailsTitle.release_date && <li key='rel-date'><span className='details-title'>Release Date: &nbsp;</span>{convertDate(detailsTitle.release_date)}</li>}
                            {detailsTitle.runtime && <li key='runtime'><span className='details-title'>Runtime:&nbsp;</span>{detailsTitle.runtime} mins</li>}
                            {detailsTitle.overview && <li key='synopsis' className='synopsis'><span className='details-title'>Synopsis:&nbsp;&nbsp;</span>{detailsTitle.overview}</li>}
                            {detailsTitle.tagline && <li key='tagline' className='tagline'><span className='details-title'>Tagline: &nbsp;</span>{detailsTitle.tagline}</li>}
                            {(detailsTitle.production_countries&&detailsTitle.production_countries.length!==0) && <li key='prod-countries'><ul className='details-ul'><span className='details-title'>Production Countries:&nbsp;</span>{detailsTitle.production_countries.map((country) => {
                              return <li className="details-li" key={country.name}>{'- '}{country.name}</li>})}
                          </ul></li>}
                        </ul>
                        

                        <ul className='details-text-column-right'>
                        {detailsTitle.original_language && <li key='og-lang'><span className='details-title'>Original Language: &nbsp;</span>{detailsTitle.original_language}</li>}

                        {(detailsTitle.spoken_languages&&detailsTitle.spoken_languages.length!==0) && <li key='spoken'><ul className='details-ul'><span className='details-title'>Spoken Languages: </span>{detailsTitle.spoken_languages.map((lang) => {
                          return <li className="details-li" key={lang.name}>{'- '}{lang.name}</li>})}
                          </ul></li>}
                        {(detailsTitle.genres&&detailsTitle.genres.length!==0) && <li key='genres'><ul className='details-ul'><span className='details-title'>Genres: </span>{detailsTitle.genres.map((genre) => {
                        return <li className="details-li" key={genre.name}>{'- '}{genre.name}</li>})}
                        </ul></li>}
                        {(detailsTitle.production_companies&&detailsTitle.production_companies.length!==0) && (
                          detailsTitle.production_companies[0].name ? 
                          <li key='prod-companies'><ul className='details-ul'><span className='details-title'>Production Companies:&nbsp;</span>{detailsTitle.production_companies.map((company) => {
                            return <li className="details-li" key={company.name}>{'- '}{company.name}</li>})}
                            </ul></li>
                            : <li key='prod-companies'><ul className='details-ul'><span className='details-title'>Production Companies:&nbsp;</span>{detailsTitle.production_companies.map((company) => {
                            return <li className="details-li" key={company}>{'- '}{company}</li>})}
                            </ul></li>)}
                        </ul>


                    </div>
                </section>
            </section>
            )
        
        }



      
    </div>
  )
}

export default FilmDetails

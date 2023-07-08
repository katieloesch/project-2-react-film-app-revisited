import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { useAuth } from "./../../contexts/AuthContext"
import { getUserData } from './../../api_config/firebase';
import { updateUserDataDocument } from './../../api_config/firebase';

import FilmCard from '../../components/Card/FilmCard'
import TvCard from '../../components/Card/TvCard'
import './WatchList.scss'


export default function WatchList() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()

  const { toWatchList, watched, removeFromWatchList, markSelectedAsWatched, selected, setSelected } = useContext(FilmTvContext);
  const [toWatchListElements, setToWatchListElements] = useState(toWatchList.current)

  useEffect(() => {

    if (currentUser) {
      console.log('-------user found')
      console.log(currentUser.uid)

    getUserData(currentUser.uid).then(
      (data) => {
        if (data !== null && data.watchList.length > 0) {
          console.log(data)
          toWatchList.current = data.watchList
          setToWatchListElements(data.watchList)
        } 
      }
    )
    // console.log(toWatchListElements.current)
    } else {
      console.log('**********no user found')
    }
  }, [])

  async function handleClearSelected() {
    console.log('selected')
    console.log(selected)
    for (const title of selected) {
      
        removeFromWatchList(title);
        setToWatchListElements(toWatchList.current);

        // updating api
        const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
        setSelected([]);

        // re-rendering watchlist
        navigate("/watchlist");
        
    }
  }
  // function handleMarkSelectedWatched() {
  //   const watchedItems = toWatchList.current.filter((item) => (item.selected === true))
  //   markSelectedAsWatched(watchedItems)
  // }

  async function clearToWatch() {
    toWatchList.current = []
    setToWatchListElements(toWatchList.current);
    const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  }

  return (
    <div className='watchlist'>
      <h1>Watchlist</h1>

      {!currentUser ? <div className='watchlist-message-2'><Link to='/login'>Sign in</Link>&nbsp;to add titles to your watchlist</div> : (
        <div>
          <div className='btns-watchlist'>
            <button className='btn btn-clear-to-watch' onClick={clearToWatch}>Clear List</button>
            <button className='btn btn-create-new-item' onClick={() => (navigate('/add-film'))}>Add new Film</button>
            <button className='btn btn-create-new-item' onClick={() => (navigate('/add-tv'))}>Add new Tv Show</button>
            {selected.length>0 && <button className='btn btn-clear-selected' onClick={handleClearSelected}>Clear selected</button>}
          </div>
          
        <div className='watchlist-titles-container'>
        <div className='card-grid-container'>
        {(toWatchListElements && toWatchListElements.length !== 0) ? <ul className='card-grid'>{toWatchListElements.map(item => {
          if (item.title) {
              return <FilmCard key={item.id} item={item} setToWatchListElements={setToWatchListElements}/>
            } else {
              return <TvCard key={item.id} item={item} setToWatchListElements={setToWatchListElements} />
            }
            
          })}</ul> : <div className='msg'><p>Your watched list is currently empty! </p><p> To add titles to your list, go to the <Link to='/'>Home</Link> page to see trending films & tv shows or search for titles in the on the <Link to='/search'>search</Link> page.</p></div>}
        </div>
      </div>
      </div>

      )}
    
    </div>
  )
}

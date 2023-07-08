import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { useAuth } from "./../../contexts/AuthContext"
import { getUserData } from './../../api_config/firebase';
import { updateUserDataDocument } from './../../api_config/firebase';

import FilmCard from '../../components/Card/FilmCard'
import TvCard from '../../components/Card/TvCard'
import './Watched.scss'

export default function Watched() {  
    
  const navigate = useNavigate();
  const { currentUser } = useAuth()

  const { watched, toWatchList, selected, setSelected, unMarkAsWatched, markSelectedAsWatched } = useContext(FilmTvContext);
  const [watchedElements, setWatchedElements] = useState(watched.current)

  useEffect(() => {

    if (currentUser) {
    getUserData(currentUser.uid).then(
      (data) => {
        if (data !== null && data.watched.length > 0) {
          watched.current = data.watched
          setWatchedElements(watched.current)

        } 
      }
    )
    } else {
      console.log('no user found')
    }
  }, [])


  async function handleClearSelected() {
    console.log('selected')
    console.log(selected)
    for (const title of selected) {
      
        unMarkAsWatched(title);
        setWatchedElements(watched.current);

        // updating api
        const resp =  await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});
        setSelected([]);

        // re-rendering watchlist
        navigate("/watched");
        
    }
  }


  async function clearWatched() {
    watched.current = []

    setWatchedElements(toWatchList.current);
    const resp = await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  }


  return (
    <div className='watchedList'>
        <h1>All the stuff you watched:</h1>

        {!currentUser ? <div className='msg'><Link to='/login'>Sign in</Link>&nbsp;to add titles you've watched</div> : (
          <div>
          <div className='btns-watchedList'>
            <button className='btn btn-clear-watched' onClick={clearWatched}>Clear List</button>
            {selected.length>0 && <button className='btn btn-clear-selected' onClick={handleClearSelected}>Clear selected</button>}
          </div>
          
          <div className='watched-titles-container'>
            <div className='card-grid-container'>
              {(watchedElements && watchedElements.length !== 0) ? <ul className='card-grid'>{watchedElements.map(item => {
                if (item.title) {
                  return <FilmCard key={item.id} item={item} setWatchedListElements={setWatchedElements} setWatchedElements={setWatchedElements}/>
                } else {
                  return <TvCard key={item.id} item={item} setWatchedElements={setWatchedElements}  setWatchedListElements={setWatchedElements} />
                }
                
              })}</ul> : <div className='msg'><p>Your watched list is currently empty! </p><p> To add titles to your list, go to the <Link to='/'>Home</Link> page to see trending films & tv shows or search for titles in the on the <Link to='/search'>search</Link> page.</p></div>}
            </div>
          </div>
          </div>
  
        )}
      
    </div>
  )


}

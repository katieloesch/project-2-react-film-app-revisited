import React, { useEffect, useState, useContext } from 'react'

import { FilmTvContext } from './../../contexts/FilmTvContext'
import { useAuth } from './../../contexts/AuthContext';
import { getUserData } from './../../api_config/firebase';
import { tmdbKey } from '../../api_config/tmdb';

import FilmCard from '../../components/Card/FilmCard.js'
import TvCard from '../../components/Card/TvCard.js';

import './Homepage.scss'


export default function Homepage() {
    const { toWatchList, watched } = useContext(FilmTvContext);
    const { currentUser } = useAuth()

    const [trendingFilms, setTrendingFilms] = useState([])
    const [trendingTv, setTrendingTv] = useState([])
    const [toWatchListElements, setToWatchListElements] = useState(toWatchList.current)
    const [watchedElements, setWatchedElements] = useState(toWatchList.current)

    useEffect(() => {
        fetchTrendingFilms()
        fetchTrendingTv()

            if (currentUser) {
            getUserData(currentUser.uid).then(
              (data) => {
                if (data !== null && data.watchList.length > 0) {
                  toWatchList.current = data.watchList
                  watched.current = data.watched
                  setToWatchListElements(data.watchList)
                  setWatchedElements(data.watched)
                } 
              }
            )
            } else {
              console.log('no user found')
            }
  
    }, [])
    
  
    async function fetchTrendingFilms() {
       const res =  await (await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${tmdbKey}&append_to_response=videos`)
        .catch(err => console.log("Error with GET request:", err)))
        .json()
        const arr = res.results
        arr.forEach((item) => (item.selected = false))
        setTrendingFilms(arr) 
    }
  
    async function fetchTrendingTv() {
        const res = await (await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${tmdbKey}&append_to_response=videos`)
        .catch(err => console.log("Error with GET request:", err)))
        .json()
        const arr = res.results
        arr.forEach((item) => (item.selected = false))
        setTrendingTv(arr)
    }
  
  
  


  return (
    <div>
        <img className='gif' id='gif-obi-wan' alt='welcome gif' src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzM1NzI0MjM2ZTQyNzYyMDcwMWNjNjM0ZmQzMDI3YzYxMjA2YjU5YiZjdD1n/3ornk57KwDXf81rjWM/giphy.gif'/>
        
        <div className='trending-title '>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="2.5em" viewBox="0 0 16 16"><path fill="currentColor" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/></svg>
            <span>Trending</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="2.5em" viewBox="0 0 16 16"><path fill="currentColor" d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/></svg>
        </div>
      
        <div className='trending-items-container'>
            <div className='trending-films-container'>
                <span className='trending-film-title'>Films</span>
                <section className='results-section'>
                {(trendingFilms.length !== 0) && <ul className='trending-films-list'>
                    {trendingFilms.map(item => <FilmCard key={item.id} item={item} setToWatchListElements={setToWatchListElements} setWatchedElements={setWatchedElements}/>)}
                    </ul>}
                </section>
            </div>
            <div className='trending-tv-container'>
                <span className='trending-tv-title'>Tv Shows</span>
                <section className='results-section'>
                {(trendingTv.length !== 0) && <ul className='trending-tv-list'>
                    {trendingTv.map(item => <TvCard key={item.id} item={item} setToWatchListElements={setToWatchListElements} setWatchedElements={setWatchedElements} />)}
                    </ul>}
                </section>
            </div>
        </div>
        
    


      
    </div>
  )
}

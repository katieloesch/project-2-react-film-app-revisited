import React, { useContext, useState, useEffect } from 'react'

import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { useAuth } from "./../../contexts/AuthContext"
import { getUserData } from './../../api_config/firebase';
import { tmdbKey } from '../../api_config/tmdb'

import FilmCard from '../../components/Card/FilmCard'
import TvCard from '../../components/Card/TvCard'

import './Search.scss'


export default function Search() {
    const { toWatchList, watched } = useContext(FilmTvContext);
    const { currentUser } = useAuth()
    
    const [queryFilm, setQueryFilm] = useState('')
    const [queryTv, setQueryTv] = useState('')
    const [filmResultsArr, setFilmResultsArr] = useState('')
    const [tvResultsArr, setTvResultsArr] = useState('')
    const [toWatchListElements, setToWatchListElements] = useState(toWatchList.current)
    const [watchedElements, setWatchedElements] = useState(toWatchList.current)

    useEffect(() => {

            if (currentUser) {
            getUserData(currentUser.uid).then(
              (data) => {
                if (data !== null && data.watchList.length > 0) {
                  console.log(data)
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


    function handleInputChangeFilm(e) {
        e.preventDefault()
        setQueryFilm(e.target.value)
    }
    function handleInputChangeTv(e) {
        e.preventDefault()
        setQueryTv(e.target.value)
    }

    function handleSearchSubmitFilm(e) {
        e.preventDefault()
        setTvResultsArr([])
        setFilmResultsArr([])
        if (queryFilm) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&append_to_response=videos&language=en-US&page=1&include_adult=false&query=${queryFilm}`)
            .then(resp => resp.json())
            .then(res => {
                const queryResults = res.results
                queryResults.forEach((item) => {
                    item.media_type = 'movie'
                    item.selected = false
                })

                setFilmResultsArr(queryResults)
            })
        }
        setQueryFilm('')
    }

    function handleSearchSubmitTv(e) {
        e.preventDefault()
        setTvResultsArr([])
        setFilmResultsArr([])
        if (queryTv) {
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${tmdbKey}&append_to_response=videos&language=en-US&page=1&include_adult=false&query=${queryTv}`)
            .then(resp => resp.json())
            .then(res => {
                const queryResults = res.results
                queryResults.forEach((item) => {
                    item.media_type = 'tv'
                    item.selected = false
                })
                setTvResultsArr(queryResults)})
        }
        setQueryTv('')
    }

  return (
    <div className='search-page'>
        <div className='search-form-container'>
            <form className='film-form'>
                <input 
                    className='search-input-film'
                    placeholder='Film Title'
                    value={queryFilm}
                    onChange={handleInputChangeFilm}
                >
                </input>
                <button
                    type='submit'
                    className='btn btn-search-submit-film'
                    onClick={handleSearchSubmitFilm}
                >
                Search Films
                </button>
            </form>
            <form className='tv-form'>
                <input 
                    className='search-input-tv'
                    placeholder='Tv Show Title'
                    value={queryTv}
                    onChange={handleInputChangeTv}
                >
                </input>
                <button
                    type='submit'
                    className='btn btn-search-submit-tv'
                    onClick={handleSearchSubmitTv}
                >
                Search Tv Shows
                </button>
            </form>
        </div>

        
            <div className='search-titles-container'>
                <div className='card-grid-container'>
                    {(filmResultsArr.length !== 0) && <ul className='card-grid'>
                        {filmResultsArr.map((item) => <FilmCard key={item.id} item={item} mediaType={'film'} setToWatchListElements={setToWatchListElements} setWatchedElements={setWatchedElements} />)}
                        </ul>}
                    {(tvResultsArr.length !== 0) && <ul className='card-grid'>
                            {tvResultsArr.map(item => <TvCard key={item.id} item={item} mediaType={'tv'} setToWatchListElements={setToWatchListElements} setWatchedElements={setWatchedElements}/>)}
                        </ul>}
                </div>
            </div>


            

            
   

    </div>
  )
}
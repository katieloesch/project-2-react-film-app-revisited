import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { FilmTvContext } from './contexts/FilmTvContext';
import { useAuth } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import WatchList from './pages/WatchList/WatchList';
import Watched from './pages/Watched/Watched';
import Search from './pages/Search/Search';
import FilmDetails from './pages/Details/FilmDetails';
import TvDetails from './pages/Details/TvDetails';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import FormAddFilm from './pages/Form/FormAddFilm';
import FormAddTv from './pages/Form/FormAddTv';
import FormEditFilm from './pages/Form/FormEditFilm';
import FormEditTv from './pages/Form/FormEditTv';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';

// import './components/Card/Card.scss'
import './App.scss';
import ForgotPassword from './pages/Auth/ForgotPassword';
import UpdateProfile from './pages/Auth/UpdateProfile';

import { getUserData } from './api_config/firebase'; 
import ContactIcons from './components/ContactIcons/ContactIcons';


function App() {
  //TMDb
  // https://www.themoviedb.org/
  // const apidocs = 'https://developers.themoviedb.org/3'
  
  // const apiKey = 'b80d4ee4fbbfe6174fcc84fb6ac757b9'


  const { currentUser } = useAuth()

  const [detailsTitle, setDetailsTitle] = useState('')
  const [editTitle, setEditTitle] = useState('')
  // const [toWatchList, setToWatchList] = useState([])
  const [userData, setUserData] = useState({})
  const [selected, setSelected] = useState([])

  const toWatchList = useRef([])
  const watched = useRef([])



  useEffect(() => {

    if (currentUser) {
      console.log(currentUser.uid)

    getUserData(currentUser.uid).then(
      (data) => {
        if (data !== null && data.watchList.length > 0) {
          toWatchList.current = data.watchList
          watched.current = data.watched

        } 
      }
    )
    // console.log(toWatchListElements.current)
    } else {
      console.log('no user found')
    }
  }, [currentUser])
  
  async function addNewToWatch(item) {
    let idList = [];
    if (toWatchList.current.length > 0) {
      idList = toWatchList.current.map((item) => item.id);
    }


    if (!idList.includes(item.id)) {
      const newItem = { ...item };
      if (newItem.production_companies.length > 0) {
        newItem.production_companies = newItem.production_companies.map((item) => item.name)
      }
      if (newItem.networks && newItem.networks.length > 0) {
        newItem.networks = newItem.networks.map((item) => item.name)
      }
      newItem.watched = false;
      toWatchList.current = [...toWatchList.current, newItem];
  
    }
  
    
  }

  function removeFromWatchList(item) {
    const rmId = item.id
    const updatedList = toWatchList.current.filter((item) => (item.id !== rmId))
    toWatchList.current = updatedList
  }


  async function markAsWatched(item) {
    let idList = watched.current.map(item => item.id)

    if (watched.current.length > 0) {
      idList = watched.current.map((item) => item.id);
    }

    if (!idList.includes(item.id)) {
      const newItem = { ...item };
      newItem.watched = false;
      watched.current = [...watched.current, newItem];
    } 

  }

  function unMarkAsWatched(item) {
    const rmId = item.id
    const updatedList = watched.current.filter((item) => (item.id !== rmId))
    watched.current = updatedList
    console.log('updated list::::::::::::::')
    console.log(watched.current)
  }

  function checkIfonToWatchList(item) {
    if (toWatchList.current.length > 0) {
    const idList = toWatchList.current.map(item => item.id)
    return idList.includes(item.id)
  } else {
    return false
  }}

  function checkIfonWatched(item) {
    if (watched.current.length > 0) {
      const idList = watched.current.map(item => item.id)
      return idList.includes(item.id)
    } else {
      return false
    }
  }

  function updateTitle(updatedTitle) {
    console.log('updatedTitle is running .....')
    console.log(updatedTitle)

    if (checkIfonToWatchList(updatedTitle)) {
      console.log('item is on towatchlist')
      const updatedToWatch = toWatchList.current.map((title) => {
        if (title.id === updatedTitle.id) {
          
          return updatedTitle
        } else {
          return title
        }
      })
      toWatchList.current = updatedToWatch
      console.log('fuck this SHITTTTT')
      console.log(updatedToWatch)
    }

 
    if(checkIfonWatched(updatedTitle)) {
      const updatedWatched = watched.current.map((title) => {
        if (title.id === updatedTitle.id) {
          return updatedTitle
        } else {
          return title
        }
      })
      watched.current = updatedWatched
    }
  }

  function removeSelectedFromWatchList(selectedArr) {
    const idList = selectedArr.map(item => item.id)
    const updatedList = toWatchList.current.filter((item) => (!idList.includes(item.id)))
    toWatchList.current = updatedList
  }

  function removeSelectedFromWatched(selectedArr) {
    const idList = selectedArr.map(item => item.id)
    const updatedList = watched.current.filter((item) => (!idList.includes(item.id)))
    watched.current = updatedList
  }

  const contextValues = {

    userData,
    setUserData,

    toWatchList,
    watched,
    
    checkIfonToWatchList,
    checkIfonWatched,

    addNewToWatch, 
    markAsWatched, 
    removeFromWatchList,
    unMarkAsWatched,
    updateTitle,

    selected,
    setSelected,
    removeSelectedFromWatchList,
    removeSelectedFromWatched,

    detailsTitle, 
    setDetailsTitle,
    editTitle,
    setEditTitle,

  }

  return (
    <div className="App">
       
          <FilmTvContext.Provider value={contextValues}>

            <Header />

            <Routes>

              <Route exact path='/' element={<Homepage />} />
              <Route path='/watchlist' element={<WatchList />}/>
              <Route path='/watched' element={<Watched />}/>
              <Route path='/search' element={<Search />} />

              <Route path='/film-details/:id' element={<FilmDetails />} />
              <Route path='/tv-details/:id' element={<TvDetails />} />
              
              <Route path='/add-film' element={<FormAddFilm />} />
              <Route path='/add-tv' element={<FormAddTv />} />
              <Route path='/edit-film/:id' element={<FormEditFilm/>} />
              <Route path='/edit-tv/:id' element={<FormEditTv />} />

              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              
              {/* protected routes: only accessible if user is logged in */}
              <Route path='/dashboard' element={currentUser ? <Dashboard /> : <Login />} />
              <Route path='/update-profile' element={currentUser ? <UpdateProfile /> : <Login />} />

              <Route path='*' element={<PageNotFound />} />

            </Routes>
          </FilmTvContext.Provider>
          <ContactIcons />        
           
      </div>
  );
}

export default App;



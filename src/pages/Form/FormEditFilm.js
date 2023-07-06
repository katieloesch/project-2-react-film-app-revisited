import { FilmTvContext } from '../../contexts/FilmTvContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { updateUserDataDocument } from './../../api_config/firebase';
import { useAuth } from "./../../contexts/AuthContext"


const FormEditFilm = () => {
  
  const navigate = useNavigate();
  const { editTitle, setEditTitle, setDetailsTitle, toWatchList, watched, updateTitle } = useContext(FilmTvContext);
  const { currentUser } = useAuth();


  const templateObj = {

    genres: editTitle.genres,
    id: editTitle.id,
    original_language: editTitle.original_language,
    overview: editTitle.overview,
    poster_path: editTitle.poster_path ? editTitle.poster_path : '',
    poster_link: editTitle.poster_link ? editTitle.poster_link : '',
    production_companies: editTitle.production_companies,
    production_countries: editTitle.production_countries,
    release_date: editTitle.release_date,
    runtime: editTitle.runtime,
    spoken_languages: editTitle.spoken_languages,
    tagline: editTitle.tagline,
    title: editTitle.title,
    media_type: 'movie',
    user_entered: editTitle.user_entered ? editTitle.user_entered : '',
    videos: editTitle.videos

  }
  const [formData, setFormData] = useState(templateObj)

  if (formData.production_countries === '') {
    formData.production_countries = []
  }
  if (formData.production_companies === '') {
    formData.production_companies = []
  }
  if (formData.spoken_languages === '') {
    formData.spoken_languages = []
  }
  if (formData.genres === '') {
    formData.genres = []
  }

  const imgWidth = '400'

function handleFormChange(e) {
    const newInput = {...formData, [e.target.name]: e.target.value}
    setFormData(newInput)
}

let [companyFields, setCompanyFields] = useState([formData.production_companies])

function addCompanyField(){
  setCompanyFields([...companyFields, {name: ''}])
}

function removeCompanyField(index) {
  if (index > 0) {
    const fields = [...companyFields]
    fields.splice(index, 1)
    setCompanyFields(fields)
  }
}


function handleCompanyField(e, index) {
  const data = [...companyFields]
  data[0][index] = {name: e.target.value}
  setCompanyFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
}

const [countryFields, setCountryFields] = useState(formData.production_countries)
function addCountryField(){
 setCountryFields([...countryFields, {name: ''}])
}


function removeCountryField(index) {
  if (index > 0) {
    const fields = [...countryFields]
    fields.splice(index, 1)
    setCountryFields(fields)
  }


}


function handleCountryField(e, index) {
  const data = [...countryFields]
  data[index] = {name: e.target.value}
  setCountryFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
}


const [languageFields, setLanguageFields] = useState(formData.spoken_languages)
function addLangField(){
 setLanguageFields([...languageFields, {name: ''}])
}

function removeLangField(index) {
  if (index > 0) {
    const fields = [...languageFields]
    fields.splice(index, 1)
    setLanguageFields(fields)
  }

}


function handleLangField(e, index) {
  const data = [...languageFields]
  data[index] = {name: e.target.value}
  setLanguageFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
 }


const [genres, setGenres] = useState(formData.genres)


function addGenre(){
 setGenres([...genres, {name: ''}])
}


function removeGenre(index) {
  if (index > 0) {
    const dropDowns = [...genres]
    dropDowns.splice(index, 1)
    setGenres(dropDowns)
  }
}

function handleGenres(e, index) {
  const data = [...genres]
  data[index] = {name: e.target.value}
  setGenres(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
}

async function handleFormSubmit(e) {
  e.preventDefault()
  console.log(formData)

  if (formData.production_countries &&formData.production_countries.length === 0) {
    formData.production_countries = ''
  }
  if (formData.production_companies&&formData.production_companies.length === 0) {
    formData.production_companies = ''
  }
  if (formData.spoken_languages && formData.spoken_languages.length === 0) {
    formData.spoken_languages = ''
  }
  if (formData.genres&&formData.genres.length === 0) {
    formData.genres = ''
  }

  await updateTitle(formData)

  console.log('UPDATED DATA???')
  console.log(formData)
  console.log()

  //updating api
  await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  

  setDetailsTitle(formData)
  setEditTitle('')
  setFormData(templateObj)
  navigate('/film-details')


  // const fetchedIdList = fetchedFilms.map((fetchedFilm) => fetchedFilm.id)
  // let newArr
  // if (fetchedIdList.includes(editTitle.id)) {
  //   newArr = fetchedFilms.map(movie => {
  //     if (movie.id === editTitle.id) {
  //       return formData
  //     } else {
  //       return movie
  //     }
  //   })
  //   setFetchedFilms(newArr)
  // }


  // if (onToWatchList(editTitle)) {
  //    newArr = toWatchList.map(movie => {
  //   if (movie.id === editTitle.id) {
  //     return formData
  //   } else {
  //     return movie
  //   }
  //   })
  //   setToWatchList(newArr)
  //   console.log(newArr)
  // }
  // setDetailsTitle(editTitle)
  // navigate('/film-details')  
}

// companyFields = companyFields[0].map((field) => (field.name))

  
  return (
    <div className='edit-film-page'>
    {!editTitle ? <h1>Loading...</h1> : (

      <form className='edit-film-form' onSubmit={handleFormSubmit}>
      <h1 className='form-title'>Edit Film</h1>
          <div className='edit-film-form-columns'>
      
              <ul className='edit-film-form-column-left'>
                  <li>Title <input name='title' onChange={handleFormChange} value={formData.title}></input></li>
                  <li>Release Date <input name='release_date' placeholder='DD/MM/YYYY' onChange={handleFormChange} value={formData.release_date}></input></li>
                  <li>Runtime <input name='runtime' onChange={handleFormChange} value={formData.runtime}></input></li>
                  <li><div className='synopsis'>Synopsis: <textarea name='overview' onChange={handleFormChange} value={formData.overview}></textarea></div></li>

                  <li>Tagline <input name='tagline' onChange={handleFormChange} value={formData.tagline}></input></li>
                  <li>Original Language <input name='original_language' onChange={handleFormChange} value={formData.original_language}></input>
                  </li>
                  <li>Spoken Languages

                  {languageFields.map((field, index) => {
                      return (<div key={index}>
                      <input name='spoken_languages' value={field.name} onChange={(e) => handleLangField(e, index)}></input>
                      <div className='btns-fields'>
                          <button type="button" className='btn field-btn' onClick={addLangField}>+</button>
                          <button type="button" className='btn field-btn' onClick={() => removeLangField(index)}>-</button>
                      </div>
                  
                      </div>)
                  })}

                  </li>
              </ul>

              <ul className='edit-film-form-column-right'>
                  <li>Genres
                      {genres.map((genre, index) => {
                          return (<div key={index}>
                  
                          <select key={index} name="genres" className='btn-dropdown' value={genre.name} onChange={(e) => handleGenres(e, index)}>
                          <option value={'Action'}>Action</option>
                          <option value={'Adventure'}>Adventure</option>
                          <option value={'Animation'}>Animation</option>
                          <option value={'Comedy'}>Comedy</option>
                          <option value={'Crime'}>Crime</option>
                          <option value={'Documentary'}>Documentary</option>
                          <option value={'Drama'}>Drama</option>
                          <option value={'Family'}>Family</option>
                          <option value={'Fantasy'}>Fantasy</option>
                          <option value={'History'}>History</option>
                          <option value={'Horror'}>Horror</option>
                          <option value={'Music'}>Music</option>
                          <option value={'Mystery'}>Mystery</option>
                          <option value={'Romance'}>Romance</option>
                          <option value={'Science Fiction'}>Science Fiction</option>
                          <option value={'Thriller'}>Thriller</option>
                          <option value={'War'}>War</option>
                          <option value={'Western'}>Western</option>

                          </select>

                          <div className='btns-fields'>        
                              <button type="button" className='btn field-btn' onClick={addGenre}>+</button>
                              <button type="button" className='btn field-btn' onClick={() => removeGenre(index)}>-</button>
                          </div>
                          
                          </div>)
                      })}

                  </li>

                  <li>Production Companies

                  

                  {companyFields[0].length ?         companyFields[0].map((field, index) => {
                      return (<div key={index}>
                      <input name='production_companies' value={field.name} onChange={(e) => handleCompanyField(e, index)}></input>
                      <div className='btns-fields'>
                          <button type="button" className='btn field-btn' onClick={() => addCompanyField()}>+</button>
                          <button type="button" className='btn field-btn' onClick={() => removeCompanyField(index)}>-</button>
                      </div>
                  
                      </div>)
                  }) : console.log('something went wrong')
                }

                  </li>

                  <li>Production Countries
                      {countryFields.map((field, index) => {
                          return (
                          <div key={index}>
                              <input name='production_countries' value={field.name} onChange={(e) => handleCountryField(e, index)}></input>
                              
                              <div className='btns-fields'>
                                  <button type="button" className='btn field-btn' onClick={addCountryField}>+</button>
                                  <button type="button" className='btn field-btn' onClick={() => removeCountryField(index)}>-</button>
                              </div>
                          </div>)
                      })}

                  </li>
              
                  <li>Image URL: <input name='poster_link' value={editTitle.user_entered ? formData.poster_link : (formData.poster_path ? `https://image.tmdb.org/t/p/w${imgWidth}${formData.poster_path}` : '')} onChange={handleFormChange}></input>
                  </li>

              </ul>
          
          </div>
          <div className='btns-edit-film'>
              <button type="submit" className='btn btn-edit-film'>Save Changes</button>
              <button className='btn btn-cancel' type="button" onClick={()=>(navigate('/watchlist'))}>Cancel</button>
          </div>
      </form>

    )}
       
            
    </div>
  
  )
}

export default FormEditFilm

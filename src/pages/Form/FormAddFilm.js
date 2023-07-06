import React, { useContext, useState } from 'react'
import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { useNavigate } from "react-router-dom";
import { updateUserDataDocument } from './../../api_config/firebase';
import { useAuth } from "./../../contexts/AuthContext"

import './Form.scss'

const FormAddFilm = () => {
  const { addNewToWatch, toWatchList, watched } = useContext(FilmTvContext);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const templateObj = {
    genres: [],
    id: Date.now(),
    original_language: '',
    overview: '',
    poster_link: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    runtime: '',
    spoken_languages: [],
    tagline: '',
    title: '',
    user_entered: true,
    media_type: 'movie',
    videos: []
    }
    
    const [formData, setFormData] = useState(templateObj)
    
    function handleFormChange(e) {
      const newInput = {...formData, [e.target.name]: e.target.value}
      setFormData(newInput)
    }


const [companyFields, setCompanyFields] = useState([{name: ''}])

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
  data[index] = {name: e.target.value}
  setCompanyFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
}

const [countryFields, setCountryFields] = useState([{name: ''}])
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


const [languageFields, setLanguageFields] = useState([{name: ''}])
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


const [genres, setGenres] = useState([{name: 'Action'}])

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

  await addNewToWatch(formData)
  
  //updating api
  await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  console.log('toWatchList')
  console.log(toWatchList.current)
  setFormData(templateObj)
  navigate('/watchlist')
}


  return (
    <div className='add-film-page'>
        <form className='new-film-form' onSubmit={handleFormSubmit}>
        <h1 className='form-title'>Add new Film</h1>
            <div className='new-film-form-columns'>
        
                <ul className='new-film-form-column-left'>
                    <li>Title <input name='title' onChange={handleFormChange}></input></li>
                    <li>Release Date <input name='release_date' placeholder='DD/MM/YYYY' onChange={handleFormChange}></input></li>
                    <li>Runtime <input name='runtime' onChange={handleFormChange}></input></li>
                    <li><div className='synopsis'>Synopsis: <textarea name='overview' onChange={handleFormChange}></textarea></div></li>

                    <li>Tagline <input name='tagline' onChange={handleFormChange}></input></li>
                    <li>Original Language <input name='original_language' onChange={handleFormChange}></input>
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

                <ul className='new-film-form-column-right'>
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

                        {companyFields.map((field, index) => {
                            return (
                            <div key={index}>
                                <input name='production_companies' value={field.name} onChange={(e) => handleCompanyField(e, index)}></input>
                                <div className='btns-fields'>
                                    <button type="button" className='btn field-btn' onClick={addCompanyField}>+</button>
                                    <button type="button" className='btn field-btn' onClick={() => removeCompanyField(index)} >-</button>
                                </div>
                            </div>)
                        })}

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
                
                    <li>Image URL <input name='poster_link' onChange={handleFormChange}></input>
                    </li>

                </ul>
            
            </div>
            <div className='btns-add-film'>
                <button type="submit" className='btn btn-add-film'>Add Film</button>
                <button className='btn btn-cancel' type="button" onClick={()=>(navigate('/watchlist'))}>Cancel</button>
            </div>
        </form>
            
    </div>
  
  )
}

export default FormAddFilm

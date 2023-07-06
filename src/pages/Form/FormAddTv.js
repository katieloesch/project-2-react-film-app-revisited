import React, { useContext, useState } from 'react'
import { FilmTvContext } from "./../../contexts/FilmTvContext"
import { useNavigate } from "react-router-dom";
import { updateUserDataDocument } from './../../api_config/firebase';
import { useAuth } from "./../../contexts/AuthContext"

import './Form.scss'

const FormAddTv = () => {

const { addNewToWatch, toWatchList, watched } = useContext(FilmTvContext);
const { currentUser } = useAuth();

const navigate = useNavigate();

const templateObj = {
  genres: [],
  created_by: [],
  id: Date.now(),
  first_air_date: '',
  last_air_date: '',
  networks: [],
  original_language: '',
  overview: '',
  origin_country: '',
  poster_link: '',
  production_companies: [],
  production_countries: [],
  spoken_languages: [],
  status: '',
  tagline: '',
  type: '',
  last_episode_to_air: {
      season_number: '',
      episode_number: '',
      name: '',
      air_date: '',
      runtime: ''
  },
  name: '',
  number_of_seasons: '',
  number_of_episodes: '',
  user_entered: true,
  media_type: 'tv',
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

const [networkFields, setNetworkFields] = useState([{name: ''}])

function addNetworkField(){
 setNetworkFields([...networkFields, {name: ''}])
}

function removeNetworkField(index) {
  if (index > 0) {
    const fields = [...networkFields]
    fields.splice(index, 1)
    setNetworkFields(fields)
  }
}

function handleNetworkField(e, index) {
  const data = [...countryFields]
  data[index] = {name: e.target.value}
  setNetworkFields(data);
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


const [createdByFields, setCreatedByFields] = useState([{name: ''}])
function addCreatedByField(){
 setCreatedByFields([...createdByFields, {name: ''}])
}

function removeCreatedBy(index) {
  if (index > 0) {
    const fields = [...createdByFields]
    fields.splice(index, 1)
    setCreatedByFields(fields)
  }

}

function handleCreatedByField(e, index) {
  const data = [...createdByFields]
  data[index] = {name: e.target.value}
  setCreatedByFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
}


const [lastEpisodeData, setLastEpisodeData] = useState({
  season_number: '',
  episode_number: '',
  name: '',
  air_date: '',
  runtime: ''
})

function handleLastEpisodeChange(e) {
  const lastEp = {...lastEpisodeData, [e.target.name]: e.target.value}
  console.log(lastEp)
  setLastEpisodeData(lastEp)

  const newInput = {...formData, ['last_episode_to_air']: lastEpisodeData}
  console.log(newInput)
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

  if (formData.genres && formData.genres.length === 0) {
    formData.genres = ''
  }
  if (formData.created_by && formData.created_by.length === 0) {
    formData.created_by = ''
  }
  if (formData.networks&&formData.networks.length === 0) {
    formData.networks = ''
  }
  if (formData.production_companie &&formData.production_companies.length === 0) {
    formData.production_companies = ''
  }
  if (formData.production_countries&&formData.production_countries.length === 0) {
    formData.production_countries = ''
  }
  if (formData.spoken_languages && formData.spoken_languages.length === 0) {
    formData.spoken_languages = ''
  }
  if (formData.languages && formData.languages.length === 0) {
    formData.languages = ''
  }

  console.log(formData)


  await addNewToWatch(formData)

  
  //updating api
  await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  console.log('toWatchList')
  console.log(toWatchList.current)
  setFormData(templateObj)
  navigate('/watchlist')
}


  return (
    <div className='add-tv-page'>
      <form className='new-tv-form' onSubmit={handleFormSubmit}>
        <h1 className='form-title'>Add new Tv Show</h1>
        <div className='new-tv-form-columns'>
          <ul className='new-tv-form-column-left'>
            <li>Title: <input name='name' onChange={handleFormChange}></input></li>
            <li>First Air Date: <input name='first_air_date' placeholder='DD/MM/YYYY' onChange={handleFormChange}></input></li>
            <li>Last Air Date: <input name='last_air_date' placeholder='DD/MM/YYYY' onChange={handleFormChange}></input></li>
            <li>Synopsis: <textarea name='overview' onChange={handleFormChange}></textarea></li>
            <li>Tagline: <input name='tagline' onChange={handleFormChange}></input></li>
            <li>Status: <input name='status' onChange={handleFormChange}></input></li>
            <li>Type: <input name='type' onChange={handleFormChange}></input></li>
            <li>Number of Seasons: <input name='number_of_seasons' onChange={handleFormChange}></input></li>
            <li>Number of Episodes: <input name='number_of_episodes' onChange={handleFormChange}></input></li>
            <li>Created By:

            {createdByFields.map((field, index) => {
              return (<div key={index}>
              <input name='created_by' value={field.name} onChange={(e) => handleCreatedByField(e, index)}></input>
              <div className='btns-fields'>
                <button type="button" className='btn field-btn' onClick={addCreatedByField}>+</button>
                <button type="button" className='btn field-btn' onClick={() => removeCreatedBy(index)}>-</button>
              </div>
             
              </div>)
            })}   </li>
      
            <li>Original Language: <input name='original_language' onChange={handleFormChange}></input></li>
            <li>Spoken Languages:
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

          <ul className='new-tv-form-column-right'>
            <li>Genres:
            {genres.map((genre, index) => {
              return (<div key={index}>
        
              <select key={index} name="genres" className='btn-dropdown' value={genre.name} onChange={(e) => handleGenres(e, index)}>
                <option value={'Action & Adventure'}> Action & Adventure</option>
                <option value={'Animation'}>Animation</option>
                <option value={'Comedy'}>Comedy</option>
                <option value={'Crime'}>Crime</option>
                <option value={'Documentary'}>Documentary</option>
                <option value={'Drama'}>Drama</option>
                <option value={'Family'}>Family</option>
                <option value={'Kids'}>Kids</option>
                <option value={'Mystery'}>Mystery</option>
                <option value={'News'}>Mystery</option>
                <option value={'Reality'}>Mystery</option>
                <option value={'Soap'}>Mystery</option>
                <option value={'Talk'}>Mystery</option>
                <option value={'Sci-Fi & Fantasy'}>Sci-Fi & Fantasy</option>
                <option value={'War & Politics'}>War & Politics</option>
                <option value={'Western'}>Western</option>
              </select>
              <div className='btns-fields'>
                <button type="button" className='btn field-btn' onClick={addGenre}>+</button>
                <button type="button" className='btn field-btn' onClick={() => removeGenre(index)}>-</button>
              </div>
              </div>)
            })}</li>



            <li>Networks:

            {networkFields.map((field, index) => {
                return (<div key={index}>
                <input name="networks" value={field.name} onChange={(e) => handleNetworkField(e, index)}></input>
                <div className='btns-fields'>
                  <button type="button" className='btn field-btn' onClick={addNetworkField}>+</button>
                  <button type="button" className='btn field-btn' onClick={() => removeNetworkField(index)} >-</button>
                </div>
              </div>)
            })}

            </li>

            <li>Production Companies:

            {companyFields.map((field, index) => {
                return (<div key={index}>
                <input name='production_companies' value={field.name} onChange={(e) => handleCompanyField(e, index)}></input>
                <div className='btns-fields'>
                  <button type="button" className='btn field-btn' onClick={addCompanyField}>+</button>
                  <button type="button" className='btn field-btn' onClick={() => removeCompanyField(index)} >-</button>
                </div>
              </div>)
            })}

            </li>
            <li>Origin Country: <input name='origin_country' onChange={handleFormChange}></input></li>

            <li>Production Countries:
              {countryFields.map((field, index) => {
                  return (<div key={index}>
                  <input name='production_countries' value={field.name} onChange={(e) => handleCountryField(e, index)}></input>
                  <div className='btns-fields'>
                    <button type="button" className='btn field-btn' onClick={addCountryField}>+</button>
                    <button type="button" className='btn field-btn' onClick={() => removeCountryField(index)}>-</button>
                  </div>
                </div>)
              })}
            </li>
            
            <li>Last Episode to Air:</li>
            <li>Season Number: <input name='season_number' onChange={handleLastEpisodeChange}></input></li>
            <li>Episode Number: <input name='episode_number' onChange={handleLastEpisodeChange}></input></li>
            <li>Title: <input name='name' onChange={handleLastEpisodeChange}></input></li>
            <li>Air Date: <input name='air_date' placeholder='DD/MM/YYYY' onChange={handleLastEpisodeChange}></input></li>
            <li>runtime: <input name='runtime' onChange={handleLastEpisodeChange}></input></li>
            <li>Image URL: <input name='poster_link' onChange={handleFormChange}></input>
            </li>
          </ul>
        </div>
        <div className='btns-add-tv'>
          <button className='btn btn-submit-new-show' type="submit">Add Show</button>
          <button className='btn btn-cancel' type="button" onClick={()=>(navigate('/watchlist'))}>Cancel</button>
        </div>
    
      </form>
    </div>
  )
}

export default FormAddTv

import { FilmTvContext } from '../../contexts/FilmTvContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { updateUserDataDocument } from './../../api_config/firebase';
import { useAuth } from "./../../contexts/AuthContext"


const FormEditTv = () => {  
  const navigate = useNavigate();
  const { editTitle, setEditTitle, setDetailsTitle, toWatchList, watched, updateTitle } = useContext(FilmTvContext);
  const { currentUser } = useAuth();

console.log(editTitle)
  const templateObj = {
    genres: editTitle.genres,
    id: editTitle.id,
    created_by: editTitle.created_by,
    first_air_date: editTitle.first_air_date,
    last_air_date: editTitle.last_air_date,
    overview: editTitle.overview,
    tagline: editTitle.tagline,
    original_language: editTitle.original_language,
    spoken_languages: editTitle.spoken_languages,
    number_of_seasons: editTitle.number_of_seasons,
    number_of_episodes: editTitle.number_of_episodes,
    production_countries: editTitle.production_countries,
    production_companies: editTitle.production_companies,
    type: editTitle.type,
    status: editTitle.status,
    origin_country: editTitle.origin_country,
    networks: editTitle.networks,
    last_episode_to_air: {
        season_number: editTitle.last_episode_to_air.season_number,
        episode_number: editTitle.last_episode_to_air.episode_number,
        name: editTitle.last_episode_to_air.name,
        air_date: editTitle.last_episode_to_air.air_date,
        runtime: editTitle.last_episode_to_air.runtime

    },
    poster_path: editTitle.poster_path ? editTitle.poster_path : '',
    poster_link: editTitle.poster_link ? editTitle.poster_link : '',

    
    name: editTitle.name,
    media_type: 'tv',
    user_entered: editTitle.user_entered ? editTitle.user_entered : '',
    videos: editTitle.videos

  }

  const [formData, setFormData] = useState(templateObj)


  if (formData.genres === '') {
    formData.genres = []
  }
  if (formData.created_by === '') {
    formData.created_by = []
  }
  if (formData.networks === '') {
    formData.networks = []
  }
  if (formData.production_companies === '') {
    formData.production_companies = []
  }
  if (formData.production_countries === '') {
    formData.production_countries = []
  }
  if (formData.spoken_languages === '') {
    formData.spoken_languages = []
  }
  if (formData.languages === '') {
    formData.languages = []
  }

  const imgWidth = '400'

  function handleFormChange(e) {
    const newInput = {...formData, [e.target.name]: e.target.value}
    setFormData(newInput)
}



let [companyFields, setCompanyFields] = useState(formData.production_companies)

function addCompanyField(){
  const newCompanies = [...formData.production_companies, '']
  setCompanyFields(newCompanies)
}

function removeCompanyField(index) {
  let newCompanies = [...formData.production_companies]
    if (index > 0) {
      newCompanies.splice(index, 1)
    }
  setCompanyFields(newCompanies)
  setFormData({...formData, production_companies: newCompanies})
}

function handleCompanyField(e, index) {
  const data = [...formData.production_companies]
  data[index] = e.target.value
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

  let newCountries = [...formData.production_countries]

  if (index > 0) {
    newCountries.splice(index, 1)
  }

  setCountryFields(newCountries)
  setFormData({...formData, production_countries: newCountries})
}

function handleCountryField(e, index) {
  const data = [...countryFields]
  data[index] = {name: e.target.value}
  setCountryFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
}




const [networkFields, setNetworkFields] = useState(formData.networks)
function addNetworkField(){
  const newNetworks = [...formData.networks, '']
 setNetworkFields(newNetworks)
}

function removeNetworkField(index) {
  let newNetworks = [...formData.networks]
  if (index > 0) {
    newNetworks.splice(index, 1)
   
  }
  setNetworkFields(newNetworks)
  setFormData({...formData, networks: newNetworks})
}

function handleNetworkField(e, index) {
  console.log(formData.networks)
  const data = [...formData.networks]
  data[index] = e.target.value;
  setNetworkFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
  console.log(formData.networks)
}

const [languageFields, setLanguageFields] = useState(formData.spoken_languages)
function addLangField(){
 setLanguageFields([...languageFields, {name: ''}])
}

function removeLangField(index) {
  let newLang = [...formData.spoken_languages]

  if (index > 0) {
    newLang.splice(index, 1)
  }
  setLanguageFields(newLang)
  setFormData({...formData, spoken_languages: newLang})
}

function handleLangField(e, index) {
  const data = [...languageFields]
  data[index] = {name: e.target.value}
  setLanguageFields(data);
  const newInput = {...formData}
  newInput[e.target.name] = data
  setFormData(newInput)
 }



 const [createdByFields, setCreatedByFields] = useState(formData.created_by)
 function addCreatedByField(){
  setCreatedByFields([...createdByFields, {name: ''}])
 }
 
 function removeCreatedBy(index) {
    let newCreators = [...formData.created_by]
    if (index > 0) {
      newCreators.splice(index, 1)
    }

    setCreatedByFields(newCreators)
    setFormData({...formData, created_by: newCreators})
  }
 
 function handleCreatedByField(e, index) {
   const data = [...createdByFields]
   data[index] = {name: e.target.value}
   setCreatedByFields(data);
   const newInput = {...formData}
   newInput[e.target.name] = data
   setFormData(newInput)
  }

  const [genres, setGenres] = useState(formData.genres)
  function addGenre(){
   setGenres([...genres, {name: ''}])
  }
  function removeGenre(index) {
    let newGenres = [...formData.genres]
    if (index > 0) {
      newGenres.splice(index, 1)
      
    }
    setGenres(newGenres)
    setFormData({...formData, genres: newGenres})
  }
  
  function handleGenres(e, index) {
    const data = [...genres]
    data[index] = {name: e.target.value}
    setGenres(data);
    const newInput = {...formData}
    newInput[e.target.name] = data
    setFormData(newInput)
  }


const [lastEpisodeData, setLastEpisodeData] = useState({
    season_number: formData.last_episode_to_air.season_number,
    episode_number: formData.last_episode_to_air.episode_number,
    name: formData.last_episode_to_air.name,
    air_date: formData.last_episode_to_air.air_date,
    runtime: formData.last_episode_to_air.runtime,
})


function handleLastEpisodeChange(e) {
  const lastEp = {...lastEpisodeData, [e.target.name]: e.target.value}
  console.log(lastEp)
  setLastEpisodeData(lastEp)

  const newInput = {...formData, last_episode_to_air: lastEp}
  console.log(newInput)
  setFormData(newInput)        
}

function handleUrlChange(e) {
  console.log(formData.user_entered)
  console.log(e.target.name)
  console.log(e.target.value)
  const newInput = {...formData, [e.target.name]: e.target.value}
  newInput.user_entered = true
  newInput.poster_path = ''
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
  if (formData.networks && formData.networks.length === 0) {
    formData.networks = ''
  }
  if (formData.production_companies && formData.production_companies.length === 0) {
    formData.production_companies = ''
  }
  if (formData.production_countries && formData.production_countries.length === 0) {
    formData.production_countries = ''
  }
  if (formData.spoken_languages && formData.spoken_languages.length === 0) {
    formData.spoken_languages = ''
  }
  if (formData.languages && formData.languages.length === 0) {
    formData.languages = ''
  }

  await updateTitle(formData)

  console.log('UPDATED DATA???')
  console.log(formData)

  //updating api
  await updateUserDataDocument({user: currentUser, watchList: toWatchList.current, watched: watched.current});

  setDetailsTitle(formData)
  setEditTitle('')
  setFormData(templateObj)
  navigate('/tv-details')
  
}


  return (
    
    <div className='edit-tv-page'>
      <form className='edit-tv-form' onSubmit={handleFormSubmit}>
        <h1 className='form-title'>Edit Tv Show</h1>
        <div className='edit-tv-form-columns'>
          <ul className='edit-tv-form-column-left'>
            <li>Title: <input name='name' onChange={handleFormChange} value={formData.name}></input></li>
            <li>First Air Date: <input name='first_air_date' placeholder='DD/MM/YYYY' onChange={handleFormChange} value={formData.first_air_date}></input></li>
            <li>Last Air Date: <input name='last_air_date' placeholder='DD/MM/YYYY' onChange={handleFormChange} value={formData.last_air_date}></input></li>
            <li>Synopsis: <textarea name='overview' onChange={handleFormChange} value={formData.overview}></textarea></li>
            <li>Tagline: <input name='tagline' onChange={handleFormChange} value={formData.tagline}></input></li>
            <li>Status: <input name='status' onChange={handleFormChange} value={formData.status}></input></li>
            <li>Type: <input name='type' onChange={handleFormChange} value={formData.type}></input></li>
            <li>Number of Seasons: <input name='number_of_seasons' onChange={handleFormChange} value={formData.number_of_seasons}></input></li>
            <li>Number of Episodes: <input name='number_of_episodes' onChange={handleFormChange} value={formData.number_of_episodes}></input></li>
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
      
            <li>Original Language: <input name='original_language' onChange={handleFormChange} value={formData.original_language}></input></li>
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

          <ul className='edit-tv-form-column-right'>
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
                <input name="networks" value={field} onChange={(e) => handleNetworkField(e, index)}></input>
                <div className='btns-fields'>
                  <button type="button" className='btn field-btn' onClick={addNetworkField}>+</button>
                  <button type="button" className='btn field-btn' onClick={() => removeNetworkField(index)} >-</button>
                </div>
              </div>)
            })}

            </li>

            <li>Production Companies:

          
           
            {companyFields.map((field, index) => {
              return (<div key={`company-${index}`}>
              <input name='production_companies' value={field} onChange={(e) => handleCompanyField(e, index)}></input>
              <div className='btns-fields'>
                  <button type="button" className='btn field-btn' onClick={() => addCompanyField()}>+</button>
                  <button type="button" className='btn field-btn' onClick={() => removeCompanyField(index)}>-</button>
              </div>
          
              </div>)
            })}

            </li>
            <li>Origin Country: <input name='origin_country' onChange={handleFormChange} value={formData.origin_country}></input></li>

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
            <li>Season Number: <input name='season_number' onChange={handleLastEpisodeChange} value={formData.last_episode_to_air.season_number}></input></li>
            <li>Episode Number: <input name='episode_number' onChange={handleLastEpisodeChange} value={formData.last_episode_to_air.episode_number}></input></li>
            <li>Title: <input name='name' onChange={handleLastEpisodeChange} value={formData.last_episode_to_air.name}></input></li>
            <li>Air Date: <input name='air_date' placeholder='DD/MM/YYYY' onChange={handleLastEpisodeChange} value={formData.last_episode_to_air.air_date}></input></li>
            <li>runtime: <input name='runtime' onChange={handleLastEpisodeChange} value={formData.last_episode_to_air.runtime}></input></li>
            <li>Image URL: <input name={formData.user_entered ? 'poster_link' : 'poster_path'} value={formData.user_entered ? formData.poster_link : (formData.poster_path && `https://image.tmdb.org/t/p/w${imgWidth}${formData.poster_path}`)} onChange={handleUrlChange}></input>
            </li>
          </ul>
        </div>
        <div className='btns-edit-tv'>
          <button className='btn btn-edit-show' type="submit">Save Changes</button>
          <button className='btn btn-cancel' type="button" onClick={()=>(navigate('/watchlist'))}>Cancel</button>
        </div>
    
      </form>
    </div>
  )
}

export default FormEditTv

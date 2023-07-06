import React from 'react'
import { useState } from 'react';
import './../../List.css'

export default function EditTvForm({ setShowDetails, fetchedTvShows, setFetchedTvShows, onWatchedList, onToWatchList, item, setWatchedList, setToWatchList, addNewToWatch, closeEditForm, editItem, toWatchList, watchedList}) {
  
  console.log(item)
 
  const templateObj = {

    genres: item.genres,
    id: item.id,
    created_by: item.created_by,
    first_air_date: item.first_air_date,
    last_air_date: item.last_air_date,
    overview: item.overview,
    tagline: item.tagline,
    original_language: item.original_language,
    spoken_languages: item.spoken_languages,
    number_of_seasons: item.number_of_seasons,
    number_of_episodes: item.number_of_episodes,
    production_countries: item.production_countries,
    production_companies: item.production_companies,
    type: item.type,
    status: item.status,
    origin_country: item.origin_country,
    networks: item.networks,
    last_episode_to_air: {
        season_number: item.season_number,
        episode_number: item.episode_number,
        name: item.name,
        air_date: item.air_date,
        runtime: item.runtime


    },
    poster_path: item.poster_path,
    poster_link: item.poster_link,

    
    name: item.name,
    media_type: 'tv',
    user_entered: item.user_entered,
    videos: item.videos

  }

const [formData, setFormData] = useState(templateObj)

function handleFormChange(e) {
    const newInput = {...formData, [e.target.name]: e.target.value}
    setFormData(newInput)
}

const [companyFields, setCompanyFields] = useState([formData.production_companies])
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


const [networkFields, setNetworkFields] = useState(formData.networks)
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



 const [createdByFields, setCreatedByFields] = useState(formData.created_by)
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
  
    const newInput = {...formData, ['last_episode_to_air']: lastEpisodeData}
        console.log(newInput)
        setFormData(newInput)        
}


function handleFormSubmit(e) {
  e.preventDefault()
  const fetchedIdList = fetchedTvShows.map((fetchedShow) => fetchedShow.id)
  let newArr
  if (fetchedIdList.includes(item.id)) {
    newArr = fetchedTvShows.map(show => {
      if (show.id === item.id) {
        return formData
      } else {
        return show
      }
    })
    setFetchedTvShows(newArr)
  }


  if (onToWatchList(item)) {
     newArr = toWatchList.map(show => {
    if (show.id === item.id) {
      return formData
    } else {
      return show
    }
    })
    setToWatchList(newArr)
    console.log(newArr)
  }

  closeEditForm()
  setShowDetails(false)
  
}


  return (
    <div className='form-div'>
    <form className='new-film-form' onSubmit={handleFormSubmit}>
    <h1 className='edit-tv-form-title'>Edit Tv Show</h1>
    <div className='edit-tv-form-columns'>
    <ul>
      <li>Title: <input name='name' onChange={handleFormChange} value={formData.name}></input></li>
      
      <li><div className='synopsis'>Synopsis: <textarea name='overview' value={formData.overview} onChange={handleFormChange}></textarea></div></li>
      <li>Tagline: <input name='tagline' value={formData.tagline} onChange={handleFormChange}></input></li>

      <li>First Air Date: <input name='first_air_date' placeholder='DD/MM/YYYY' value={formData.first_air_date} onChange={handleFormChange}></input></li>
      <li>Last Air Date: <input name='last_air_date' placeholder='DD/MM/YYYY' value={formData.last_air_date} onChange={handleFormChange}></input></li>
      <li>Status: <input name='status' value={formData.status} onChange={handleFormChange}></input></li>

       <li>Created By:

      {createdByFields.map((field, index) => {
        return (<div key={index}>
        <input name='created_by' value={field.name} onChange={(e) => handleCreatedByField(e, index)}></input>
        <button type="button" className='btn input-btn' onClick={addCreatedByField}>+</button>
        <button type="button" className='btn input-btn' onClick={() => removeCreatedBy(index)}>-</button>
        </div>)
      })}   </li>
 




    </ul>
    <ul>
    <li>Genres:

    {genres.map((genre, index) => {
      return (<div key={index}>

      <select key={index} name="genres" className='btn-dropdown' value={genre.name} onChange={(e) => handleGenres(e, index)}>
        <option value={'Action & Adventure'}> Action & Adventure,</option>
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
      
      <button type="button" className='btn input-btn' onClick={addGenre}>+</button>
      <button type="button" className='btn input-btn' onClick={() => removeGenre(index)}>-</button>
      </div>)
    })}


    <li>Networks:

    {networkFields.map((field, index) => {
      return (<div key={index}>
      <input name="networks" value={field.name} onChange={(e) => handleNetworkField(e, index)}></input>
      <button type="button" className='btn input-btn' onClick={addNetworkField}>+</button>
      <button type="button" className='btn input-btn' onClick={() => removeNetworkField(index)} >-</button>
      </div>)
    })}

    </li>

    

    </li>
     
      <li>Production Companies:

      {companyFields.map((field, index) => {
        return (<div key={index}>
        <input name='production_companies' value={field.name} onChange={(e) => handleCompanyField(e, index)}></input>
        <button type="button" className='btn input-btn' onClick={addCompanyField}>+</button>
        <button type="button" className='btn input-btn' onClick={() => removeCompanyField(index)} >-</button>
        </div>)
      })}

      </li>

      <li>Origin Country: <input name='origin_country' value={formData.origin_country} onChange={handleFormChange}></input></li>


      <li>Production Countries:

      {countryFields.map((field, index) => {
        return (<div key={index}>
        <input name='production_countries' value={field.name} onChange={(e) => handleCountryField(e, index)}></input>
        <button type="button" className='btn input-btn' onClick={addCountryField}>+</button>
        <button type="button" className='btn input-btn' onClick={() => removeCountryField(index)}>-</button>
        </div>)
      })}

      </li>

  
      </ul>
      <ul>
      <li>Type: <input name='type' value={formData.type} onChange={handleFormChange}></input></li>

      <li>Number of Seasons: <input name='number_of_seasons' value={formData.number_of_seasons} onChange={handleFormChange}></input></li>
      <li>Number of Episodes: <input name='number_of_episodes' value={formData.number_of_episodes} onChange={handleFormChange}></input></li>
    
      <li>Original Language: <input name='original_language' value={formData.original_language} onChange={handleFormChange}></input>
      </li>

      <li>Spoken Languages:

      {languageFields.map((field, index) => {
        return (<div key={index}>
        <input name='spoken_languages' value={field.name} onChange={(e) => handleLangField(e, index)}></input>
        <button type="button" className='btn input-btn' onClick={addLangField}>+</button>
        <button type="button" className='btn input-btn' onClick={() => removeLangField(index)}>-</button>
        </div>)
      })}

      </li>
   
      <li>Image URL: <input name='poster_link' value={item.user_entered ? formData.poster_link : formData.poster_path} onChange={handleFormChange}></input>
      </li>
    <div className='edit-tv-btns'>
      <button className='btn btn-edit-show' type="submit">Save Changes</button>
      <button className='btn btn-cancel' type="button" onClick={closeEditForm}>Cancel</button>
    </div>
    
    
  </ul>
  </div>

  </form>
      
    </div>
  )
}

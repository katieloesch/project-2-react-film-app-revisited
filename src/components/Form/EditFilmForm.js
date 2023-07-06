// import React from 'react'
// import { useState } from 'react';
// import './../../List.css'

// export default function EditFilmForm({ setShowDetails, fetchedFilms, setFetchedFilms, onWatchedList, onToWatchList, item, setWatchedList, setToWatchList, addNewToWatch, closeEditForm, editItem, toWatchList, watchedList}) {
  
//   console.log(item)
 
//   const templateObj = {

//     genres: item.genres,
//     id: item.id,
//     original_language: item.original_language,
//     overview: item.overview,
//     poster_path: item.poster_path,
//     poster_link: item.poster_link,
//     production_companies: item.production_companies,
//     production_countries: item.production_countries,
//     release_date: item.release_date,
//     runtime: item.runtime,
//     spoken_languages: item.spoken_languages,
//     tagline: item.tagline,
//     title: item.title,
//     media_type: 'movie',
//     user_entered: item.user_entered,
//     videos: item.videos

//   }

// const [formData, setFormData] = useState(templateObj)

// function handleFormChange(e) {
//     const newInput = {...formData, [e.target.name]: e.target.value}
//     setFormData(newInput)
// }

// const [companyFields, setCompanyFields] = useState([formData.production_companies])
// function addCompanyField(){
//   setCompanyFields([...companyFields, {name: ''}])
// }

// function removeCompanyField(index) {
//   if (index > 0) {
//     const fields = [...companyFields]
//     fields.splice(index, 1)
//     setCompanyFields(fields)
//   }
// }

// function handleCompanyField(e, index) {
//   const data = [...companyFields]
//   data[index] = {name: e.target.value}
//   setCompanyFields(data);
//   const newInput = {...formData}
//   newInput[e.target.name] = data
//   setFormData(newInput)
// }

// const [countryFields, setCountryFields] = useState(formData.production_countries)
// function addCountryField(){
//  setCountryFields([...countryFields, {name: ''}])
// }


// function removeCountryField(index) {
//   if (index > 0) {
//     const fields = [...countryFields]
//     fields.splice(index, 1)
//     setCountryFields(fields)
//   }


// }

// function handleCountryField(e, index) {
//   const data = [...countryFields]
//   data[index] = {name: e.target.value}
//   setCountryFields(data);
//   const newInput = {...formData}
//   newInput[e.target.name] = data
//   setFormData(newInput)
// }


// const [languageFields, setLanguageFields] = useState(formData.spoken_languages)
// function addLangField(){
//  setLanguageFields([...languageFields, {name: ''}])
// }

// function removeLangField(index) {
//   if (index > 0) {
//     const fields = [...languageFields]
//     fields.splice(index, 1)
//     setLanguageFields(fields)
//   }

// }

// function handleLangField(e, index) {
//   const data = [...languageFields]
//   data[index] = {name: e.target.value}
//   setLanguageFields(data);
//   const newInput = {...formData}
//   newInput[e.target.name] = data
//   setFormData(newInput)
//  }


// const [genres, setGenres] = useState(formData.genres)


// function addGenre(){
//  setGenres([...genres, {name: ''}])
// }

// function removeGenre(index) {
//   if (index > 0) {
//     const dropDowns = [...genres]
//     dropDowns.splice(index, 1)
//     setGenres(dropDowns)
//   }
// }

// function handleGenres(e, index) {
//   const data = [...genres]
//   data[index] = {name: e.target.value}
//   setGenres(data);
//   const newInput = {...formData}
//   newInput[e.target.name] = data
//   setFormData(newInput)
// }

// function handleFormSubmit(e) {
//   e.preventDefault()
//   // const fetchedIdList = fetchedFilms.map((fetchedFilm) => fetchedFilm.id)
//   // let newArr
//   // if (fetchedIdList.includes(item.id)) {
//   //   newArr = fetchedFilms.map(movie => {
//   //     if (movie.id === item.id) {
//   //       return formData
//   //     } else {
//   //       return movie
//   //     }
//   //   })
//   //   setFetchedFilms(newArr)
//   // }


//   // if (onToWatchList(item)) {
//   //    newArr = toWatchList.map(movie => {
//   //   if (movie.id === item.id) {
//   //     return formData
//   //   } else {
//   //     return movie
//   //   }
//   //   })
//   //   setToWatchList(newArr)
//   //   console.log(newArr)
//   // }

//   // closeEditForm()
//   // setShowDetails(false)
  
// }


//   return (
//     <div className='form-div edit-film-form'>
//     <form className='new-film-form' id='edit-film-form' onSubmit={handleFormSubmit}>
//     <h1 className='form-title'>Edit Film</h1>
//     <div className='new-film-form-columns edit-film-columns'>
//     <ul>
//       <li>Title: <input name='title' onChange={handleFormChange} value={formData.title}></input></li>
      
//       <li>Release Date: <input name='release_date' placeholder='DD/MM/YYYY' onChange={handleFormChange} value={formData.release_date}></input></li>
//       <li>Runtime: <input name='runtime' value={formData.runtime} onChange={handleFormChange}></input></li>
//       <li><div className='synopsis'>Synopsis: <textarea name='overview' value={formData.overview} onChange={handleFormChange}></textarea></div></li>

//       <li>Tagline: <input name='tagline' value={formData.tagline} onChange={handleFormChange}></input></li>

//       <li>Original Language: <input name='original_language' value={formData.original_language} onChange={handleFormChange}></input>
//       </li>

//       <li>Spoken Languages:

//       {languageFields.map((field, index) => {
//         return (<div key={index}>
//         <input name='spoken_languages' value={field.name} onChange={(e) => handleLangField(e, index)}></input>
//         <button type="button" className='btn input-btn' onClick={addLangField}>+</button>
//         <button type="button" className='btn input-btn' onClick={() => removeLangField(index)}>-</button>
//         </div>)
//       })}

//       </li>


//     </ul>
//     <ul>
//     <li>Genres:

//     {genres.map((genre, index) => {
//       return (<div key={index}>

//       <select key={index} name="genres" className='btn-dropdown' value={genre.name} onChange={(e) => handleGenres(e, index)}>
//         <option value={'Action'}>Action</option>
//         <option value={'Adventure'}>Adventure</option>
//         <option value={'Animation'}>Animation</option>
//         <option value={'Comedy'}>Comedy</option>
//         <option value={'Crime'}>Crime</option>
//         <option value={'Documentary'}>Documentary</option>
//         <option value={'Drama'}>Drama</option>
//         <option value={'Family'}>Family</option>
//         <option value={'Fantasy'}>Fantasy</option>
//         <option value={'History'}>History</option>
//         <option value={'Horror'}>Horror</option>
//         <option value={'Music'}>Music</option>
//         <option value={'Mystery'}>Mystery</option>
//         <option value={'Romance'}>Romance</option>
//         <option value={'Science Fiction'}>Science Fiction</option>
//         <option value={'Thriller'}>Thriller</option>
//         <option value={'War'}>War</option>
//         <option value={'Western'}>Western</option>

//       </select>
      
//       <button type="button" className='btn input-btn' onClick={addGenre}>+</button>
//       <button type="button" className='btn input-btn' onClick={() => removeGenre(index)}>-</button>
//       </div>)
//     })}

    

//     </li>
     
//       <li>Production Companies:

//       {companyFields.map((field, index) => {
//         return (<div key={index}>
//         <input name='production_companies' value={field.name} onChange={(e) => handleCompanyField(e, index)}></input>
//         <button type="button" className='btn input-btn' onClick={addCompanyField}>+</button>
//         <button type="button" className='btn input-btn' onClick={() => removeCompanyField(index)} >-</button>
//         </div>)
//       })}

//       </li>



//       <li>Production Countries:

//       {countryFields.map((field, index) => {
//         return (<div key={index}>
//         <input name='production_countries' value={field.name} onChange={(e) => handleCountryField(e, index)}></input>
//         <button type="button" className='btn input-btn' onClick={addCountryField}>+</button>
//         <button type="button" className='btn input-btn' onClick={() => removeCountryField(index)}>-</button>
//         </div>)
//       })}

//       </li>

   
   
   
//       <li>Image URL: <input name='poster_link' value={item.user_entered ? formData.poster_link : formData.poster_path} onChange={handleFormChange}></input>
//       </li>
    
//       <button className='btn btn-submit-new-show' type="submit">Save Changes</button>
//       <button className='btn btn-cancel' type="button" onClick={closeEditForm}>Cancel</button>
    
    
//   </ul>
//   </div>

//   </form>
      
//     </div>
//   )
// }

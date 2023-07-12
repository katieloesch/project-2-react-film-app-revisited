import React from 'react'
import { gifs } from './../../assets/gifs'
import './PageNotFound.scss'


export default function PageNotFound() {
  return (
    <div className='page-not-found'>
        <h1 className='page-not-found-title'>404&nbsp;&nbsp;PAGE NOT FOUND</h1>
        <div className='gifs'>
         <img className='gif' src='https://media3.giphy.com/media/kF0ngyP7S1DfmzKqiN/giphy.gif?cid=ecf05e47i8jow95a7pskun823ublvqrg8ojbnnbz7cnk5qx2&rid=giphy.gif&ct=g'/>
         <img className='gif' src={gifs.ronSwanson}/>
        </div>
      </div>
  )
}

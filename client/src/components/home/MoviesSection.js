import React from 'react'
import ShowInPlaceHeader from '../ShowInPlaceHeader'
import MoviesContainter from './MoviesContainter'
import MoviesInPlaceContainer from './MoviesInPlaceContainer'

function MoviesSection({ moviesByPlace = false }) {
  return (
    <div className='movies-section'>
      {
        moviesByPlace
        &&
        <ShowInPlaceHeader showtype={"Movies"} />
      }
      {
        moviesByPlace
          ?
          <MoviesInPlaceContainer />
          :
          <MoviesContainter />
      }
    </div>
  )
}

export default MoviesSection
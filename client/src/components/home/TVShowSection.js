import React from 'react'
import ShowInPlaceHeader from '../ShowInPlaceHeader'
import TVShowContainer from './TVShowContainer'

function TVShowSection() {
  return (
    <div className='tv-show-section'>
      <ShowInPlaceHeader showtype={"TV Shows"} />
      <TVShowContainer />
    </div>
  )
}

export default TVShowSection
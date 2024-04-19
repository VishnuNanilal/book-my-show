import React from 'react'
import MoviesSection from '../home/MoviesSection'
function Movie() {
  return (
    <div className='main-center'>
        <MoviesSection moviesByPlace={true}/>
    </div>
  )
}

export default Movie
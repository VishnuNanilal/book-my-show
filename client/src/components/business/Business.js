import React, { useState } from 'react'
import "./Business.css"
import NavBar from './NavBar'
import MovieModal from './MovieModal'
import TheaterModal from './TheaterModal'
import Show from './Show'
import Main from './Main'
import { Route, Routes } from 'react-router-dom'

function Business() {
  const [movieModal, setMovieModal] = useState(false)
  const [theaterModal, setTheaterModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <main className='main-center'>
        {movieModal && <MovieModal setMovieModal={setMovieModal}/>} 
        {theaterModal && <TheaterModal setTheaterModal={setTheaterModal}/>}
        
        <NavBar setMovieModal={setMovieModal} setTheaterModal={setTheaterModal} setShowModal={setShowModal} disabled={{movieModal, theaterModal, showModal}}/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/show' element={<Show />} />
        </Routes>
    </main>
  )
}

export default Business
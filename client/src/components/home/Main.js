import React from 'react'
import "./Home.css"

import NavBar from './NavBar'
import MoviesSection from './MoviesSection'
// import TrendingSection from './TrendingSection'

function Main() {
  return (
    <main className='main-center'>
        <NavBar />
        <MoviesSection />
        {/* <TrendingSection /> */}
    </main>
  )
}

export default Main
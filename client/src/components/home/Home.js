import React from 'react'   
import {Routes, Route} from 'react-router-dom'
import Header from '../header/Header'
import Movie from '../movies/Movie'
import TVShow from '../TVShows/TVShow'
import Profile from '../ProfileSection'
import Business from '../business/Business'
import Main from './Main'
import ShowRequestApproval from '../business/ShowRequestApproval'
import CityModal from '../CityModal'
import { useSelector } from 'react-redux'
import ShowDetails from './ShowDetails'
import BookShow from './BookShow'
import Bookings from './Bookings'

function Home() {
  const user = useSelector(state=>state.user)
  return (
    <div>
        <Header />
          {
            !user.place &&
            <CityModal />
          }
        <Routes>
          <Route path='/movies' element={<Movie />} />
          <Route path='/tv-shows' element={<TVShow />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/business/*' element={<Business />} />
          <Route path='/home' element={<Main />} />
          <Route path='/place' element={<CityModal />} />
          <Route path='show-requests-approval' element={<ShowRequestApproval />} />
          <Route path='show-details/:showid' element={<ShowDetails />} />
          <Route path='show-details/:showid/book-show/:theaterid/:time' element={<BookShow />} />
          <Route path='/' element={<Main />} />
        </Routes>
    </div>
  )
}

export default Home
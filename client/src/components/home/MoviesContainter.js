import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { GetApprovedShowsAPI } from '../../api/show'
import { GetMovieByIdAPI } from '../../api/movie'
import IsLoading from '../IsLoading'
import { useSelector } from 'react-redux'
function MoviesContainter() {
  const user = useSelector(state => state.user)
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //get all movies
  useEffect(() => {
    async function fetchApprovedShows() {
        let showResponses = await GetApprovedShowsAPI();
        if (showResponses.success) {

          // Fetch theater availability for each show
          let movieResponses = showResponses.data.map(async (show) => GetMovieByIdAPI(show.movieId).then((movieResponse)=>{
            return {
              showId: show._id,
              movieData: movieResponse.data
            }
          }))

          movieResponses = await Promise.all(movieResponses)
          setShows(movieResponses)
          setIsLoading(false)
        }
      }

    fetchApprovedShows();
  }, []);

// console.log("//////////", shows)
return (
  isLoading ?
    <IsLoading />
    :
    <div className='movies-cont'>
    {
      shows.length === 0 ?
      <div>No movies to show</div>
      :
        shows.map(show => <MovieCard showId={show.showId} movieData={show.movieData} />)
    }
    </div>
)
}

export default MoviesContainter
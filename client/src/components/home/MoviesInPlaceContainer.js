import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { GetApprovedShowsAPI } from '../../api/show'
import { GetMovieByIdAPI } from '../../api/movie'
import IsLoading from '../IsLoading'
import { useSelector } from 'react-redux'
import { GetTheaterByIdAPI } from '../../api/theater'
function MoviesInPlaceContainer() {
  const user = useSelector(state => state.user)
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //get all movies
  useEffect(() => {
    async function fetchApprovedShows() {
      try {
        let showResponses = await GetApprovedShowsAPI();
        if (showResponses.success) {
          // Fetch theater availability for each show
          let movieResponses = showResponses.data.map(async (show) => {
              let anyTheaterAvailable = false;
  
              // Check theater availability for each theater asynchronously
              for (let theaterId of show.theaterIds) {
                let currentTheaterAvailable = await GetTheaterByIdAPI(theaterId)
                  .then(response => {
                    return response.data.location.toLowerCase() === user.place.toLowerCase();
                  })
                  .catch(error => {
                    console.error("Error fetching theater details:", error);
                    return false; // Assuming false indicates unavailability in this case
                  });
  
                console.log(">>>", currentTheaterAvailable);
  
                if (currentTheaterAvailable) {
                  anyTheaterAvailable = true;
                  break; // No need to continue checking if theater is already available
                }
              }
  
              // If any theater is available, fetch movie details
              if (anyTheaterAvailable) {
                return GetMovieByIdAPI(show.movieId).then(response => {
                  return {
                    showId: show._id,
                    movieData: response.data
                  };
                });
              } else {
                // If no theater is available, return null
                return null;
              }
            })

          movieResponses = await Promise.all(movieResponses)
  
          // Filter out null values (where theaters were not available)
          movieResponses = movieResponses.filter(movie => movie !== null);
  
          setShows(movieResponses);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching approved shows:", error);
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

export default MoviesInPlaceContainer
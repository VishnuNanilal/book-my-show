import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetMovieByIdAPI } from '../../api/movie';
import Table from '../Table';
import { GetShowByIdAPI, UpdateShowAddTheaterIdAPI } from '../../api/show';
import { GetTheaterByIdAPI } from '../../api/theater';
import { UpdateUserRemoveShowRequestAPI } from '../../api/user';
import { setUser } from '../../redux/userSlice'
import IsLoading from '../IsLoading';

export default function ShowRequests() {
  const user = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchedMovieData, setFetchedMovieData] = useState([]);
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const movieDataPromises = user.showRequests.map(async (showObj) => {
        let { showid, theaterid } = showObj
        // console.log("showObj", showObj, "showid", showid, "theaterid", theaterid)
        let showResponse = await GetShowByIdAPI(showid)
        // console.log("show: ", showResponse)
        let movie;
        let movieResponse = await GetMovieByIdAPI(showResponse.data.movieId);
        if (movieResponse.success) {
          movie = movieResponse.data
        }
        console.log(movieResponse.message);

        let theater;
        let theaterResponse = await GetTheaterByIdAPI(theaterid)
        if (theaterResponse.success) {
          theater = theaterResponse.data
        }
        console.log(theaterResponse.message);

        return {
          name: movie.name,
          release_date: movie.release_date,
          director: movie.director,
          theater_name: theater.name,
          theater_location: theater.location,
          buttons: (
            <span className='table-btn-cont'>
              <button className="good-btn" onClick={() => handleShowAccept(showResponse.data._id, theaterid)}>Accept</button>
              <button className="bad-btn" onClick={() => handleShowReject(showResponse.data._id, theaterid)}>Reject</button>
            </span>
          ),
        };
      });

      const fetchedMovieData = await Promise.all(movieDataPromises);
      setFetchedMovieData(fetchedMovieData);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component is mounted
    fetchData();
  }, [user]); // The dependency array ensures that fetchData is only called once when the component mounts and user changes.
  
  async function handleShowAccept(showid, theaterid) {
    try{
      //add theaterid to show theaterIds list
      let response = await UpdateShowAddTheaterIdAPI(showid, theaterid)
      console.log(response.message)
      //remove from user's show request list
      await UpdateUserRemoveShowRequest(user._id, showid, theaterid)
      alert('Show req accepted for theater.')
    }
    catch(err){
      console.log(err)
    }
  }

  
  function handleShowReject(showid, theaterid) {
    UpdateUserRemoveShowRequest(user._id, showid, theaterid)
  }
  
  async function UpdateUserRemoveShowRequest(userid, showid, theaterid) {
    try{
      let userResponse = await UpdateUserRemoveShowRequestAPI(userid, { showid, theaterid })
      console.log(userResponse.message)
      dispatch(setUser(userResponse.data))
    }
    catch(err){
      console.log("Error with removing show req from user", err)
    }
  }

  return (
    <>
      <h2>Show Requests</h2>
      {
        isLoading ?
        <IsLoading />
        :
        <div className='movies-section'>
        <div className='show-cont'>
          <Table columnNames={["No", "NAME", "RELEASE DATE", "DIRECTOR", "THEATER", "LOCATION"]}
            dataArray={fetchedMovieData} />
        </div>
      </div>
      }
    </>
  )
}

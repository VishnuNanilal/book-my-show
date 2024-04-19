import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GetShowByIdAPI } from '../../api/show'
import { GetMovieByIdAPI } from '../../api/movie'
import { GetTheaterByIdAPI } from '../../api/theater'
import IsLoading from '../IsLoading'
import TheaterDetails from '../TheaterDetails'

export default function ShowDetails() {
    const { showid } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    // const [show, setShow] = useState()

    const [movie, setMovie] = useState({
        name: "",
        poster: "",
        release_date: "",
        rating: 0,
        genre: "",
        director: ""
    })
    const [theaters, setTheaters] = useState([])

    useEffect(() => {
        async function fetchShowData() {
            let showResponse = await GetShowByIdAPI(showid)
            let movieResponse = await GetMovieByIdAPI(showResponse.data.movieId)
            let theaterPromise = showResponse.data.theaterIds.map(theaterId => GetTheaterByIdAPI(theaterId).then(theater => theater.data))
            // setShow(showResponse.data)
            setMovie(movieResponse.data)
            let theaters = await Promise.all(theaterPromise)
            //to remove duplicates if present.
            let temp = new Set();
            theaters = theaters.filter((theater)=>{
                if(temp.has(theater.name)){
                    return false
                }
                temp.add(theater.name)
                return true
            })
            //..................................
            
            setTheaters(theaters)
            setIsLoading(false)
        }
        fetchShowData()
    }, [showid])

    return (
        isLoading
            ?
            <IsLoading />
            :
            <div className='main-center'>
                <div className='movies-section'>
                    <div className="show-details-movie-cont">
                        <img src={movie.poster} alt="poster" style={{ width: "50%" }} />
                        <div className='show-details-movie-details-cont'>
                            <div>
                                <h1>{movie.name}</h1>
                                <h3>{movie.release_date.substring(0, 4)}</h3>
                                <div style={{ marginBottom: "1rem" }}>{movie.genre}</div>
                                <div>{movie.rating}/10</div>
                            </div>

                            <span>
                                <span style={{ fontWeight: "600" }}>Director</span>
                                <span style={{ marginLeft: "1rem" }}>{movie.director}</span>
                            </span>
                        </div>
                    </div>

                    <hr></hr>
                    <h2 style={{ marginLeft: "5rem" }}>Theaters</h2>
                    <div className="show-details-theater-cont">
                        {
                            theaters.map(theater => <TheaterDetails payload={theater} />)
                        }
                    </div>
                </div>
            </div>
    )
}

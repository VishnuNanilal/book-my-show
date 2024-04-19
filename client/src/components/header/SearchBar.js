import React, { useState, useEffect, useMemo } from "react";
import { GetMovieByIdAPI } from "../../api/movie";
import { GetApprovedShowsAPI } from "../../api/show";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
    const [input, setInput] = useState("")
    const [shows, setShows] = useState([])
    const [data, setData] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchShows() {
            let showResponse = await GetApprovedShowsAPI()
            setShows(showResponse.data)
        }
        fetchShows()
    }, [])

    useEffect(() => {
        async function fetchAllMovies() {
            if (input.trim().length === 0) {
                setData([])
                return
            }

            let moviesArr = shows.map(show => {
                return GetMovieByIdAPI(show.movieId).then(movieResponse => ({
                    showId: show._id,
                    movieName: movieResponse.data.name
                }))
            })

            moviesArr = await Promise.all(moviesArr)
            moviesArr = moviesArr.filter(data => data.movieName.toLowerCase().includes(input.trim().toLowerCase()))
            console.log("...", moviesArr)
            setData(moviesArr)
        }

        fetchAllMovies()
    }, [input])

    function handleClick(showId) {
        setInput("")
        setData([])
        navigate(`/show-details/${showId}`)
    }

    return (
        <div className="search-bar-cont">
            <input className="search-bar" placeholder="Search data, TV shows etc..." onChange={(e) => setInput(e.target.value)} value={input} />
            {
                data.length > 0 &&
                <div className="search-result-cont">
                    {
                        data.map((data, ind) => <div key={ind} className="search-result" onClick={() => handleClick(data.showId)}>{data.movieName}</div>)
                    }
                </div>
            }
        </div>
    )
}
import Table from '../Table'
import { useSelector } from 'react-redux'
import { GetAllTheaters, GetTheaterByIdAPI } from '../../api/theater'
import { useState, useEffect } from 'react'
import { AddShowAPI } from '../../api/show'
import { UpdateUserAddShowRequestAPI } from '../../api/user'

export default function Show() {
    let user = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        selectedMovie: null,
        selectedTheaters: []
    })

    const movieDataArray = user.userMovies.map(movie => {
        return {
            name: movie.name,
            release_date: movie.release_date,
            rating: movie.rating,
            genre: movie.genre,
            director: movie.director,
            check: <input name='selectedMovie' type='radio' onChange={(e) => handleFormData(e, movie._id)} />
        }
    })

    let [theaterDataArray, setTheaterDataArray] = useState([])
    useEffect(() => {
        async function handleGetAllTheaters() {
            let response = await GetAllTheaters()
            if (response.success) {
                setTheaterDataArray(response.data.map(theater => {
                    return {
                        name: theater.name,
                        location: theater.location,
                        screen_num: theater.screen_num,
                        checkbox: <input type="checkbox" name='selectedTheaters' onChange={(e) => handleFormData(e, theater._id)} />
                    }
                }))
            }
        }
        handleGetAllTheaters()
    }, [])

    function handleFormData(e, value) {
        let { type } = e.target
        if (type === 'radio') {
            setFormData(prev => {
                return {
                    ...prev,
                    selectedMovie: value
                }
            })
        }
        else { //theater list
            setFormData(prev => {
                let prevList = prev.selectedTheaters
                const updatedList = prevList.includes(value)
                    ? prevList.filter(item => item !== value)
                    : [...prevList, value];

                return {
                    ...prev,
                    selectedTheaters: updatedList
                }
            });
        }
    }

    // console.log("list=>", formData)
    async function handleSubmit(e) {
        e.preventDefault()

        if(!formData.selectedMovie || formData.selectedTheaters.length===0) alert("Select a movie and at least one theater")
        //adds show to DB
        let showResponse = await AddShowAPI({ userId: user._id, movieId: formData.selectedMovie, theaterIds: [] }) // creates a new Show to DB.
        // console.log(showResponse.data)
        if (showResponse.success) {
            let theaters = formData.selectedTheaters
            for (let i = 0; i < theaters.length; i++) { //send showid to each user as a show request
                let theaterResponse = await GetTheaterByIdAPI(theaters[i]) //send id
                await UpdateUserAddShowRequestAPI(theaterResponse.data.userId, {showid: showResponse.data._id, theaterid: theaterResponse.data._id}) //req to add current movieId to current theater owner
            }
        }
        console.log(showResponse.message)
        alert("Show added")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create A Show</h1>
            <h2>Own Movies</h2>
            <div className='movies-section'>
                <div className='own-movies-cont'>
                    <Table columnNames={["No", "NAME", "RELEASE DATE", "RATING", "GENRE", "DIRECTOR"]}
                        dataArray={movieDataArray} />
                </div>
            </div>

            <h2>All Theaters</h2>
            <div className='movies-section'>
                <div className='own-movies-cont'>
                    <Table columnNames={["No", "NAME", "LOCATION", "SCREEN #"]}
                        dataArray={theaterDataArray} />
                </div>
            </div>

            <div className='submit-btn-cont' style={{marginBottom: '5rem'}}>
                <button className='submit-btn'>Add Show</button>
            </div>
        </form>
    )
}

import Table from '../Table'
import { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteMovieAPI} from '../../api/movie'
import { DeleteTheaterAPI } from '../../api/theater'
import { UpdateUserDeleteMovieAPI, UpdateUserDeleteTheaterAPI } from '../../api/user'
import { setUser } from '../../redux/userSlice'
import MovieModal from './MovieModal'
import TheaterModal from './TheaterModal'
import ShowRequests from './ShowRequests'
import EditButton from '../EditButton'
import DeleteButton from '../DeleteButton'

export default function Main() {
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let [movieModal, setMovieModal] = useState(false)
    let [theaterModal, setTheaterModal] = useState(false)

    let [selectedMovie, setSelectedMovie] = useState({
        _id: "",
        poster: null,
        name: "",
        release_date: "",
        rating: 0,
        genre: "",
        director: ""
    })
    console.log("user>>>", user)
    let [selectedTheater, setSelectedTheater] = useState({
        _id: "",
        name: "",
        location: "",
        userId: "",
        screen_num: 0,
        seat_num: 0,
        timings: [],
        price: 0
    })

    let movieTableData = user.userMovies.map((movie) => {
        return {
            name: movie.name,
            release_date: movie.release_date,
            rating: movie.rating,
            genre: movie.genre,
            director: movie.director,
            buttons: <span className='table-btn-cont'>
                <EditButton handleClick={() => handleMovieEdit(movie._id)}/>
                <DeleteButton handleClick={() => handleMovieDelete(movie._id)}/>
            </span>
        }
    })

    let theaterTableData = user.userTheaters.map((theater) => {
        return {
            name: theater.name,
            location: theater.location,
            screen_num: theater.screen_num,
            seat_num: theater.seat_num,
            buttons: <span className='table-btn-cont'>
                <EditButton handleClick={() => handleTheaterEdit(theater._id)}/>
                <DeleteButton handleClick={() => handleTheaterDelete(theater._id)}/>
            </span>
        }
    })

    async function handleMovieDelete(movieid) {
        //remove movie from movie DB
        let response = await DeleteMovieAPI(movieid)
        console.log(response.message)
        if (response.success) {
            //remove movie from users userMovie list
            response = await UpdateUserDeleteMovieAPI(user._id, movieid)
            //set store with updated userdata (movieList specifically)
            dispatch(setUser(response.data))
        }
    }

    function handleMovieEdit(movieid) {
        let currentMovie = user.userMovies.filter((movie) => movie._id === movieid)[0]
        setSelectedMovie(currentMovie)
        setMovieModal(true)
    }

    async function handleTheaterDelete(theaterid) {
        //remove movie from movie DB
        let response = await DeleteTheaterAPI(theaterid)
        console.log(response.message)
        if (response.success) {
            //remove movie from users userMovie list
            response = await UpdateUserDeleteTheaterAPI(user._id, theaterid)
            console.log(response.message)
            //set store with updated userdata (movieList specifically)
            dispatch(setUser(response.data))
        }
    }
    
    function handleTheaterEdit(theaterid) {
        let currentTheater = user.userTheaters.filter((theater) => theater._id === theaterid)[0]
        console.log("LLLL", currentTheater)
        setSelectedTheater(currentTheater)
        setTheaterModal(true)
    }
    return (
        <main>
            {
                movieModal && <MovieModal setMovieModal={setMovieModal} modalType={"edit"}
                    payload={{ userid: user._id, selectedMovie: selectedMovie }} />
            }
            {
                theaterModal && <TheaterModal setTheaterModal={setTheaterModal} modalType={"edit"}
                    payload={{ userid: user._id, selectedTheater: selectedTheater }} />
            }
            <h2>Own Movies</h2>
            <div className='movies-section'>
                <div className='own-movies-cont'>
                    <Table columnNames={["No", "NAME", "RELEASE DATE", "RATING", "GENRE", "DIRECTOR"]}
                        dataArray={movieTableData} />
                </div>
            </div>
            <h2>Own Theaters</h2>
            <div className='movies-section'>
                <div className='own-theater-cont'>
                    <Table columnNames={["No", "NAME", "LOCATION", "SCREEN #", "SEAT #"]} dataArray={theaterTableData} />
                </div>
            </div>
            
            <ShowRequests />
        </main>
    )
}

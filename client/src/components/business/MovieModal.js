import { React, useState } from 'react'
import LabelAndInput from '../LabelAndInput'
import { AddMovieAPI, EditMovieAPI } from '../../api/movie'
import { GetUserData, UpdateUserAddMovieAPI } from '../../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice'

function MovieModal({ setMovieModal, modalType = 'create', payload }) {
    // payload={{movieid:selectedMovie._id, userid: user._id, selectedMovie: selectedMovie}}
    let user = useSelector(state => state.user)
    let dispatch = useDispatch()

    const [formData, setFormData] = useState(modalType === 'create' ? {
        name: "",
        poster: null,
        release_date: new Date(),
        rating: 0,
        genre: "",
        director: ""
    } : payload.selectedMovie)

    //Adds movie to movie DB and updates current user's movielist with this movie's id.
    async function handleSubmit(e) {
        e.preventDefault()
        if (modalType === 'create') {
            console.log("Formdata to be submitted: ", formData)
            let response = await AddMovieAPI(formData)
            //add movie id to current user'userMovies' property
            response = await UpdateUserAddMovieAPI(user._id, response.data._id)
            //set store with updated userdata (movieList specifically)
            console.log("RESPONSE: ", response.data)
            dispatch(setUser(response.data))
        }
        else {
            let response = await EditMovieAPI(payload.selectedMovie._id, formData)
            if (response.success) {
                response = await GetUserData(payload.userid)
                dispatch(setUser(response.data))
            }
            console.log(response.message)
        }
        setMovieModal(false)
    }

    let release_date = " ";
    if (modalType === 'edit') {
        const dateObject = new Date(formData.release_date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');
        release_date = `${year}-${month}-${day}`
    }

    return (
        <form className='modal' onSubmit={handleSubmit}>
            <button className="modal-close-btn exit-btn" onClick={() => setMovieModal(false)}>X</button>

            <LabelAndInput
                label="Name: " name="name" placeholder="name" type="text"
                state={{ formData, setFormData }} required={true} defaultValue={formData.name} />

            <LabelAndInput
                label="Poster : " name="poster" placeholder="poster" type="text"
                state={{ formData, setFormData }} required={true} defaultValue={formData.poster} max={200}/>

            <LabelAndInput
                label="Release Date: " name="release_date" placeholder="release date" type="Date"
                state={{ formData, setFormData }} required={true} defaultValue={modalType === 'edit' ? release_date : "2023-12-12"} min={Date.now()}/>

            <LabelAndInput
                label="Rating: " name="rating" placeholder="rating" type="number"
                state={{ formData, setFormData }} required={true} defaultValue={formData.rating} min={0} max={10}/>

            <LabelAndInput
                label="Genre: " name="genre" placeholder="genre" type="text"
                state={{ formData, setFormData }} defaultValue={formData.genre} />

            <LabelAndInput
                label="Director: " name="director" placeholder="director" type="text"
                state={{ formData, setFormData }} defaultValue={formData.director} />

            <button className='submit-btn'>{modalType === 'create' ? "Add Movie" : "Edit Movie"}</button>
        </form>
    )
}

export default MovieModal
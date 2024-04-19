import axiosInstance from '.'

export async function AddMovieAPI(payload){
    try{
        const response = await axiosInstance.post('/movie/add-movie', payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetAllMoviesAPI(payload){
    try{
        const response = await axiosInstance.get('/movie/all-movies')
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetMovieByIdAPI(movieid){
    try{
        const response = await axiosInstance.get(`/movie/${movieid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function EditMovieAPI(movieid, payload){
    // console.log("movieid", movieid," payload ",payload)
    try{
        let response = await axiosInstance.patch(`/movie/${movieid}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function DeleteMovieAPI(movieid){
    try{
        let response = await axiosInstance.delete(`/movie/${movieid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}
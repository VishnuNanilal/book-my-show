import axiosInstance from ".";

export async function RegisterUser(payload){
    console.log("payload", payload)
    try{
        let response = await axiosInstance.post('/register', payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function SignInUser(payload){
    try{
        const response = await axiosInstance.post('/sign-in', payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function AuthorizeUser(){
    try{
        let response = await axiosInstance.post('/user/authorize')
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetUserData(userid){
    try{
        let response = await axiosInstance.get(`/user/${userid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserDetailsAPI(userid, payload){
    console.log(userid, payload)
    try{
        let response = await axiosInstance.patch(`/user/${userid}/update/profile/`, payload, {headers: {"Content-Type": 'multipart/form-data'}})
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserSetPlaceAPI(userid, place){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/update/${place}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserAddMovieAPI(userid, movieid){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/add-movie/${movieid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserDeleteMovieAPI(userid, movieid){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/delete-movie/${movieid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserAddTheaterAPI(userid, theaterid){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/add-theater/${theaterid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserDeleteTheaterAPI(userid, theaterid){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/delete-theater/${theaterid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserAddShowRequestAPI(userid, payload){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/add-show-req`, payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateUserRemoveShowRequestAPI(userid, payload){
    try{
        let response = await axiosInstance.patch(`/user/${userid}/remove-show-req`, payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}
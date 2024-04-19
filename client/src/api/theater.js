import axiosInstance from ".";

export async function AddTheaterAPI(payload){
    try{
        let response = await axiosInstance.post('/theater/add-theater', payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetAllTheaters(){
    try{
        let response = await axiosInstance.get('/theater/all-theaters')
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetTheaterByIdAPI(theaterid){
    try{
        let response = await axiosInstance.get(`/theater/${theaterid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function EditTheaterAPI(theaterid, payload){
    // console.log("movieid", movieid," payload ",payload)
    try{
        let response = await axiosInstance.patch(`/theater/${theaterid}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function DeleteTheaterAPI(theaterid){
    try{
        let response = await axiosInstance.delete(`/theater/${theaterid}`)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}
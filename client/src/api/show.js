import axiosInstance from ".";

export async function AddShowAPI(payload){
    try{
        let response = await axiosInstance.post('/show/add-show', payload)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetShowByIdAPI(showid){
    try{
        let response = await axiosInstance.get(`/show/${showid}`)
        // console.log("show fteched from BE", response)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetUnapprovedShowsAPI(){
    try{
        let response = await axiosInstance.get('/show/unapproved')
        console.log("response", response)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function GetApprovedShowsAPI(){
    try{
        let response = await axiosInstance.get('/show/approved')
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function ApproveShowById(showid){
    try{
        let response = await axiosInstance.patch(`/show/approve/${showid}`)
        console.log("response", response)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function DeleteShowById(showid){
    try{
        let response = await axiosInstance.delete(`/show/${showid}`)
        console.log("response", response)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}

export async function UpdateShowAddTheaterIdAPI(showid, theaterid){
    try{
        let response = await axiosInstance.patch(`/show/add-theater/${showid}`, {theaterid})
        // console.log("show fteched from BE", response)
        return response.data
    }
    catch(err){
        return err.response.data
    }
}


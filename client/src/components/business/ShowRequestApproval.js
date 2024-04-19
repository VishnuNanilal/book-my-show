import React, {useEffect, useState} from 'react'
import { GetUnapprovedShowsAPI, ApproveShowById, DeleteShowById } from '../../api/show'
import Table from '../Table'
import { GetMovieByIdAPI } from '../../api/movie'
import IsLoading from '../IsLoading'

export default function ShowRequestApproval() {
const [shows, setShows] = useState([])
const [disableButton, setDisableButton] = useState(false)
const [isLoading, setIsLoading] = useState(true)
useEffect(()=>{
    fetchUnapprovedShows()
}, [])

async function fetchUnapprovedShows(){
    try{
        let showResponse = await GetUnapprovedShowsAPI() //returns an array of unapproved shows
        if(showResponse.success){
            let arr = []
            for(let show of showResponse.data){
                if(show.theaterIds.length>0){
                    let movieResponse = await GetMovieByIdAPI(show.movieId)
                    arr.push({showid: show._id,  movie: movieResponse.data})
                }
            }
            setShows(arr)
            setIsLoading(false)
        }
    }
    catch(err){
        console.log(err)
    }
}

console.log("Unapproved movie after fetched", shows)
let showTableData = shows.map(showObj=>{
    let {showid, movie} = showObj
    return {
        name: movie.name,
        release_date: movie.release_date,
        rating: movie.rating,
        genre: movie.genre,
        director: movie.director,
        buttons: <span className='table-btn-cont'>
            <button className="good-btn" disabled={disableButton} onClick={()=>ApproveShow(showid)}>Approve</button>
            <button className="bad-btn" disabled={disableButton} onClick={()=>RejectShow(showid)}>Reject</button>
            </span>
    }
})
            
async function ApproveShow(showid){
    setDisableButton(true)
    let response = await ApproveShowById(showid)
    alert('Show Request Approved.')
    if(response.success){
        await fetchUnapprovedShows()
    }
    setDisableButton(false)
}

async function RejectShow(showid){
    setDisableButton(true)
    let response = await DeleteShowById(showid)
    if(response.success){
        fetchUnapprovedShows()
    }
    setDisableButton(false)
}

return (
    <div className='main-center'>
        <h2>Show Approval</h2>
        {
            isLoading ?
            <IsLoading />
            :
            <div className='movies-section'>
            {
                shows.length===0 ? 
                <div>No shows to approve</div> : 
                <Table columnNames={["No", "NAME", "RELEAST DATE", "RATING", "GENRE", "DIRECTOR"] } 
                dataArray={showTableData}/>
            }
            </div>
        }
    </div>
  )
}

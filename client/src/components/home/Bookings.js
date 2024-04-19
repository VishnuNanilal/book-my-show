import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GetBookingsById } from '../../api/bookings'
import { GetShowByIdAPI } from '../../api/show'
import { GetMovieByIdAPI } from '../../api/movie'
import { GetTheaterByIdAPI } from '../../api/theater'
import Table from '../Table'
import IsLoading from '../IsLoading'

function Bookings() {
  const user = useSelector(state => state.user)
  const [bookings, setBookings] = useState([])
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      let bookingsResponse = await GetBookingsById(user._id)
      console.log(bookingsResponse.message)
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.data)
        console.log("bookingsResponse.data", bookingsResponse.data)

        let showsArr = bookingsResponse.data.map(booking => GetShowByIdAPI(booking.showid).then(response => response.data))
        showsArr = await Promise.all(showsArr)
        // console.log("shows", showsArr)

        let moviesArr = showsArr.map(show => GetMovieByIdAPI(show.movieId).then(response => response.data))
        moviesArr = await Promise.all(moviesArr)
        // console.log("movies", moviesArr)

        let theatersArr = bookingsResponse.data.map(booking => GetTheaterByIdAPI(booking.theaterid).then(response => response.data))
        theatersArr = await Promise.all(theatersArr)
        // console.log("theaters", theatersArr)

        let tableDataArr = []
        for (let i = 0; i < moviesArr.length; i++) {
          bookingsResponse.data[i].bookedSeats = bookingsResponse.data[i].bookedSeats.sort((x, y) => y - x)
          let bookSeatStr = bookingsResponse.data[i].bookedSeats.reduce((acc, elem) => elem + ", " + acc, "")
          tableDataArr.push({
            movieName: moviesArr[i].name,
            theaterName: theatersArr[i].name,
            bookedSeats: bookSeatStr,
            time: bookingsResponse.data[i].time
          })
        }
        console.log("custom array: ", tableDataArr)
        setTableData(tableDataArr)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='main-center'>
      <div className='movies-section'>
        <h2 className="heading">Bookings</h2>
        {
          isLoading
            ?
            <IsLoading />
            :
            <Table columnNames={["No", "Movie", "Theater", "Seat #", "Time"]}
              dataArray={tableData}
              classNames={["booking-table"]} />
          // bookings.map(booking=><div>{booking._id}</div>)
        }
      </div>
    </div>
  )
}

export default Bookings
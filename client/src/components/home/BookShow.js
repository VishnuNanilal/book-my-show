import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GetShowByIdAPI } from '../../api/show'
import { GetMovieByIdAPI } from '../../api/movie'
import { GetTheaterByIdAPI, EditTheaterAPI } from '../../api/theater'
import IsLoading from '../IsLoading'
import StripeCheckout from 'react-stripe-checkout'
import { BooKShowAPI, MakePaymentAPI } from '../../api/bookings'
import { useSelector } from 'react-redux'

function BookShow() {
    const user = useSelector(state => state.user)
    let { showid, theaterid, time } = useParams()
    let [movie, setMovie] = useState({
        name: ""
    })
    let [theater, setTheater] = useState({
        seat_num: 0,
        timings: [{
            time: "",
            bookedSeats: []
        }]
    })
    let [bookedSeats, setBookedSeats] = useState([])
    let [selectedSeats, setSelectedSeats] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            let showResponse = await GetShowByIdAPI(showid)
            console.log(showResponse.message)
            if (showResponse.success) {
                
                let movieResponse = await GetMovieByIdAPI(showResponse.data.movieId)
                if (movieResponse.success) {
                    setMovie(movieResponse.data)
                }
                
                let theatersResponse = await GetTheaterByIdAPI(theaterid)
                if (theatersResponse.success) {
                    setTheater(theatersResponse.data)
                    setIsLoading(false)
                }
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        let timings = theater.timings.filter(timing => timing.time === time)
        if (timings.length > 0) {
            setBookedSeats(timings[0].bookedSeats)
            // console.log(timings[0].bookedSeats)
        }
    }, [theater])

    const onToken = async (token) => {
        try {
            let paymentResponse = await MakePaymentAPI(token,
                selectedSeats.length * theater.price * 100)

            alert(paymentResponse.message)

            if (paymentResponse.success) {
                let bookingResponse = await BooKShowAPI({
                    //userid, showid, seatnum, transactionid
                    userid: user._id,
                    showid,
                    theaterid,
                    time, 
                    bookedSeats: selectedSeats,
                    transactionid: paymentResponse.data //transaction id
                })
                console.log(bookingResponse.message)

                if (bookingResponse.success) {
                    //update theater's booked seats in DB
                    let curr_timing = theater.timings.filter(timing => timing.time === time)
                    let other_timing = theater.timings.filter(timing => timing.time !== time)

                    let new_timingObj = {
                        time: time,
                        bookedSeats: [...curr_timing[0].bookedSeats, ...selectedSeats]
                    }
                    let new_timingArr = [
                        ...other_timing,
                        new_timingObj
                    ]
                    let newTheaterObj = {
                        ...theater,
                        timings: new_timingArr
                    }
                    //update on DB end
                    let theaterResponse = await EditTheaterAPI(theaterid, newTheaterObj)
                    console.log(theaterResponse.message)
                    if (theaterResponse.success) {
                        setBookedSeats(new_timingObj.bookedSeats)
                        setTheater(newTheaterObj)
                        // console.log("bookedSeats updated after theaterUpdation")
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleSeatBtnClick(seatNo) {
        //add current seat to selected seat list
        if (bookedSeats.includes(seatNo)) {
            return
        }

        if (selectedSeats.includes(seatNo)) {
            let removedList = selectedSeats.filter(currSeatNo => currSeatNo !== seatNo)
            setSelectedSeats(removedList)
        }
        else {
            setSelectedSeats(prev => ([...prev, seatNo]))
        }
    }

    // console.log("movie: ", movie, "theater", theater)
    // console.log("booked seats", bookedSeats)
    let styleObj = { marginBottom: ".5rem" }
    return (
        <div className='main-center'>
            {
                isLoading
                    ?
                    <IsLoading />
                    :
                    <>
                        <div style={{marginBottom: "3rem", marginLeft: "1rem"}}>
                            <h1 style={styleObj}>{movie.name}</h1>
                            <div>
                                <h4 style={styleObj}>{theater.name.toUpperCase()}</h4>
                                <div style={styleObj}>{theater.location}</div>
                            </div>
                            <h3 style={styleObj}>{time}</h3>
                        </div>
                        <div className='movies-section'>
                            <div className='theater-seating-cont' >
                                {
                                    Array.from({ length: theater.seat_num }, (data, index) => {
                                        let btnNo = index + 1
                                        let btnStatus = ""
                                        if (bookedSeats.includes(btnNo)) {
                                            btnStatus = "seat-btn-disabled" //grey color
                                        }
                                        else if (selectedSeats.includes(btnNo)) {
                                            btnStatus = "seat-btn good-btn" //green color
                                        }
                                        else {
                                            btnStatus = "seat-btn"
                                        }

                                        return <div className={`${btnStatus}`} onClick={() => handleSeatBtnClick(btnNo)}>{btnNo}</div>
                                    })
                                }
                                <StripeCheckout
                                    token={onToken}
                                    stripeKey="pk_test_51P6Q2sSJ2B5Vx6844Aq36OZEYP51CB8lGAWSedO2UPI8aEqnqoxraGhi31mB4mJyiUPWMJMqTK8u8J6EWrBRQvd900O7DQPDg1"
                                    name="Payment"
                                    amount={selectedSeats.length * theater.price * 100}
                                    currency="INR"
                                >
                                    <button className='city-btn' style={{ height: "3rem", marginTop: "3rem", border: "3px solid lightblue" }}>Make Payment</button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default BookShow
const express = require('express')
const app = express()
require('dotenv').config()
const userRouter = require('./routers/UserRouter')
const movieRouter = require('./routers/MovieRouter')
const theaterRouter = require('./routers/TheaterRouter')
const showRouter = require('./routers/ShowRouter')
const bookingsRouter = require('./routers/BookingsRouter')
const path = require('path')

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', userRouter)
app.use('/movie', movieRouter)
app.use('/theater', theaterRouter)
app.use('/show', showRouter)
app.use('/bookings', bookingsRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}


const port = 8080
app.listen(port, ()=>console.log("Connection to server established on port:", port))
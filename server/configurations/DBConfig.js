const mongoose = require('mongoose')
mongoose.connect(process.env.DB_link, {})
let connection = mongoose.connection

connection.on('connected', ()=>console.log('Connected to DB established.'))
connection.on('error', ()=>console.log('Connection to DB failed'))

module.exports=mongoose;
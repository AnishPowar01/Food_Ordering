const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')


const mongoose = require('mongoose')

//database connection

const url = 'mongodb://127.0.0.1/food';
mongoose.connect(url,{});

const connection = mongoose.connection;
connection.once('open',function(){
    console.log('Database connected...');
}).on('error', function (error) {
    console.log('Connection Failed..',error)
});


// set template engine

app.use(expressLayout)

app.set('views',path.join(__dirname, '/resources/views'))

app.set('view engine','ejs')


require('./routes/web')(app)   //init routes rerturn here



//Assests Kidhar rakhe he

app.use(express.static('public'))





app.listen(PORT,()=>{
    console.log(`Listening on port${PORT}`)
})
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')



// set template engine

app.use(expressLayout)

app.set('views',path.join(__dirname, '/resources/views'))

app.set('view engine','ejs')


//Assests Kidhar rakhe he

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')

})

app.get('/cart',(req,res) =>{
  
    res.render('customers/cart')
})

app.get('/login',(req,res)=>{
    res.render('Auth/login')
})
app.get('/register',(req,res)=>{
    res.render('Auth/register')
})


app.listen(PORT,()=>{
    console.log(`Listening on port${PORT}`)
})
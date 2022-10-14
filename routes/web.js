function initRoutes(app)
{
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
}


// for export

module.exports = initRoutes
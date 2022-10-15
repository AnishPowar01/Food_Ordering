
const Menu = require('../../models/menu')


function homeController()
{
    //factory functions// pattern of programming -> object production...

    return {
        //CRUD controller
        //index method for read

        async index(req,res)
        {
            const pizzas = await Menu.find()
            // console.log(pizzas)
            return res.render('home',{pizzas:pizzas})

            // Menu.find().then(function(pizzas){

            // res.render('home',{pizzas:pizzas})


            // })   
        }

    }

}

module.exports = homeController
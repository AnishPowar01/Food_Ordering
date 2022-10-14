
function homeController()
{
    //factory functions// pattern of programming -> object production...

    return {
        //CRUD controller
        //index method for read

        index(req,res)
        {
            res.render('home')
        }

    }

}


module.exports = homeController
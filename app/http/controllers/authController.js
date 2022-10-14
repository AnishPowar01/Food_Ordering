
function authController()
{
    //factory functions// pattern of programming -> object production...

    return {
        //CRUD controller
        //index method for read

        login(req,res)
        {
            res.render('Auth/login')
        },
        register(req,res)
        {
            res.render('Auth/register')
        }

    }

}


module.exports = authController

function cartController()
{
    //factory functions// pattern of programming -> object production...

    return {
        //CRUD controller
        //index method for read

        index(req,res)
        {
            res.render('customers/cart')
        }

    }

}


module.exports = cartController
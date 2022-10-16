
function cartController()
{
    //factory functions// pattern of programming -> object production...

    return {
        //CRUD controller
        //index method for read

        index(req,res)
        {
            res.render('customers/cart')
        },

        update(req,res)
        {
            return res.json({data:'ALL is well'})
        }

    }

}


module.exports = cartController
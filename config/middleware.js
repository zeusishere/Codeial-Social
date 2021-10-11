// this middleware was created to transfer flash from req to response
module.exports.setFlash = function( req ,res, next)
{
   
    res.locals.flash={
                        "success" : req.flash("success"),
                        "error" : req.flash("err")
    };
    
    next();
}
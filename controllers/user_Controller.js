const User = require("../models/user")
module.exports.signup = function(req,res)
{
    res.render("signUp.ejs", {
        title :"codeial | sign up"
    });
    // res.send("yoyoyoyo")
} ;
module.exports.signin = function(req,res)
{
    res.render("signin.ejs", {
        title :"codeial | sign in"
    });
    // res.send("yoyoyoyo")
} ;
module.exports.createUser =function(req,res)
{
    console.log(req.body);
    // res.redirect("back");
    if(req.body.password != req.body.confirm_password)
    {
        console.log("password did not match") ;
        res.redirect("back");
        return ;
    }
    User.findOne({email:req.body.email} , function (err ,user) 
    {
        if (err)
        {
            console.log("error in finding user in db for sign up") ;
            return ;
        }
        if(!user)
        {

            User.create( req.body , function(err ,user)
            {
                if(err)
                {console.log("error in creating user");
                return ;}
                console.log(user) ;
                res.redirect('/user/sign-in') ;
            } );
        }
        else
        {
            console.log("user already exists") ;
            res.redirect('back') ;
        }
    } );
}
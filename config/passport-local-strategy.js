// model used for authentication
const User = require("../models/user");

// required necessary passport auths
const passport = require("passport");
const LocalStrategy= require("passport-local").Strategy ;

// setting up middleware passport to use the strategy passport-local. this will be used to authenticate the user
passport.use( new LocalStrategy({
    usernameField : "email",
    passReqToCallback: true ,
},  
function (req, email , password , done )
{
    User.findOne({email:email},
        function (err ,user)
        {
            if (err)
            {
                console.log("error in finding user");
                req.flash("success","error in finding user")
                return done (err) ;
            }
            // if user not found or password mismatch
            if (!user || user.password!= password )
            {
                req.flash("success","user not found/invalid password ")
                console.log("invalid username or password");
                return done (null ,false);
            }
            //user found
            return done(null , user);
        }
        );
}
 )  ) ;

//  exports
module.exports = passport ;

 passport.serializeUser( function(user ,done)
 {
     done(null ,user.id);
 } );
 passport.deserializeUser( function(id ,done)
 {
   User.findById(id , function(err ,user)
   {
       // user not found
    if(err)
    {
        console.log("error in finding the user");
        return done(error);
    }
    return done (null, user) ;
   } )
    
 } );


// setup as a middleware
 passport.checkAuthentication = function (req ,res , next)
 {
    console.log('req reached checkAuthentication')
     if(req.isAuthenticated()) // provided by passport
     {

        console.log("user is authenticated")
        return next();
     }  console.log("user is not authenticated")

        return res.redirect("/user/sign-in");
 }
passport.setAuthenticatedUser = function (req ,res ,next)
{
    if (req.isAuthenticated() )
    {
        res.locals.user = req.user ;

    }
    next();
}


 module.exports = passport ;
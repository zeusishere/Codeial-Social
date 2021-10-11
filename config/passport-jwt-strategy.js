const passport = require("passport");
const  JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require ("passport-jwt").ExtractJwt ;

User = require("../models/user");

const opts ={
                jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken() ,
                secretOrKey : "codeial" 
};

// setting up new jwt passport strategy
passport.use( new JWTStrategy(
                                opts , 
                                function(jwtpayload , done)
                                {
                                    User.findById (jwtpayload._id,
                                                   function(err,user)
                                                   {
                                                    if (err)
                                                    {
                                                        console.log("error in finding user from jwt") ;
                                                        return ;
                                                    }
                                                    if (user)
                                                    {
                                                       
                                                        return done(null,user) ;
                                                    }
                                                    else
                                                    {
                                                        return (null , false) ;
                                                    }
                                                   }
                                                  )
                                }
                             )
  );
  module.exports = passport ;
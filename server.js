const express = require ("express") ;
const port = 8000;
//layouts
const layouts =require("express-ejs-layouts");
//cookie-parser
const cookieParser = require("cookie-parser");
// connect-flash
const flash = require ("connect-flash");

// include  config/mongoose.js before creating app
const db =require("./config/mongoose")  ; // you can avoid  extension 
// const User =require("./models/user") ; // model not needed here



// required for authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
// jwt authentication
const passportJwt = require("./config/passport-jwt-strategy");
const MongoStore = require("connect-mongo")(session);

// creating an instance of express
const app = express();

// required middleware for flash messages
const customMiddleware = require ("./config/middleware");


//setting up view engine and specifying the directory to look in for required views
app.set("view engine" , "ejs" ) ;
app.set("views" , "./views");
//setting up static folder to look for css ,images ,css
app.use(express.static("./assets") );
//setting up form data decoding
app.use(express.urlencoded() ) ;
//layouts middlewares
app.use(layouts) ;
app.set("layout extractStyles", true);
//setting up middleware cookie parser
app.use(cookieParser() );
// setting up sessions
app.use(session({
                    name:"codeial",
                    secret:"blahSomething",
                    saveUninitialized:false ,
                    resave:false ,
                    cookie:{
                            maxAge:1000*60*100 ,
                    },
                    store : new MongoStore (
                                            {
                                                mongooseConnection :db ,
                                                autoRemove :"disabled" 
                                            },
                                            function(err)
                                            {
                                                console.log(err || "connect mongodb setup okay ");
                                            }
                                            )
                }
));
app.use(passport.initialize() );
app.use(passport.session() );
app.use(passport.setAuthenticatedUser);
// flash messages
app.use(flash());
app.use(customMiddleware.setFlash);



// routing
app.use("/",require("./routers/router.js"));



app.listen(port, function(err)
{
    if (err)
    {
        console.log("there was an error in setting up the server")
        return ;
    }
    else
    {
        console.log("server is running on port 8000") ;
    }
});
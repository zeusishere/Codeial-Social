const express = require ("express") ;
const port = 8000;
//layouts
const layouts =require("express-ejs-layouts");
//cookie-parser
const cookieParser = require("cookie-parser");

// include  config/mongoose.js before creating app
const db =require("./config/mongoose")  ; // you can avoid  extension 
const User =require("./models/user") ; // model

const app = express();
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
const mongoose = require("mongoose") ;
mongoose.connect("mongodb://localhost/db_codeial");

const db = mongoose.connection ;

db.on("error", console.error.bind(console ,'error connecting to database in config folder')) ;
db.once("open" , function()
{
    console.log("successfully connected to database in config folder ");
} );
// include this file before firing up the server
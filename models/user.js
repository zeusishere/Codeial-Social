const mongoose = require('mongoose');
const userSchema =new  mongoose.Schema(
    {
        email : {
                    type:String ,
                    required : true ,
                    unique : true ,
        } ,
        password : {
                    type :String,
                    required : true ,
        },
        name :{
                    type:String ,
                    required : true ,
        }
    } ,
        {timestamps : true}// mongoose manages timestamps on itself
    
);

const User = mongoose.model("User" , userSchema) ;
module.exports = User ;
// required in server.js before firing up the server
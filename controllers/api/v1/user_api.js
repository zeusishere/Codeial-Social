const User = require("../../../models/user") ;
const jwt = require("jsonwebtoken")
module.exports.createSession =async function(req,res)
{
try{
    console.log("body",req.body.email ,req.body.password)
   let user =await User.findOne({email:req.body.email}) ;

//    if user not found
    if (!user || user.password != req.body.password)
    {
        return res.json(422 ,{
                                message : "invalid username or password"
        })
    }
    console.log(user.email, user.password)
    return res.json(200,{
                        message:" sign in successful",
                        data :{
                                token :jwt.sign(user.toJSON(),
                                "codeial" ,
                                {expiresIn:100000}  )
                        }
                    }) ;
}

catch (err)
{
    console.log(err)
    return res.json(500,{
                          message :"Internal server error is here"  
    })
}
}
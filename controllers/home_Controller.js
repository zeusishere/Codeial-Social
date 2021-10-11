const Post = require("../models/post");
const User = require("../models/user");
// module.exports.home = function (req ,res)
// {
//     Post.find({})
//                 .populate('user')
//                 .populate({path: 
//                                      'comments',
//                            populate :{
//                                         path : "user"
//                            }
//                                     })
    
//                 .exec(function(err,posts)
//                 {
//                   User.find({},function(err,users)
//                   {
//                     if(err)
//                     {
//                         console.log("error in finding posts");
                        
//                         return res.redirect("/user/profile") ;
//                     }
//                     res.render("home", {title: "codeial | home" ,posts:posts,all_users:users });
//                   })
//                 })   ;
// }
// async code for above function
module.exports.home = async function (req ,res)
{
  try
  {
     let posts= await Post.find({})
                .populate('user')
                .populate({path: 
                                     'comments',
                           populate :{
                                        path : "user"
                           }
                                    }).sort("-createdAt") ;
    
                
     let users= await User.find({});
     res.render("home", {title: "codeial | home" ,posts:posts,all_users:users });
}
                catch (err)
                {
                    console.log("error in finding posts");
                    return res.redirect("/user/profile") ;
                  
                }
                
}
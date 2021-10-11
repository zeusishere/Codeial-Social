const Post = require("../../../models/post");
const Comment = require("../../../models/comment")
module.exports.index =async function (req,res)
{
    let posts= await Post.find({})
    .populate('user')
    .populate({path: 
                         'comments',
               populate :{
                            path : "user"
               }
                        }).sort("-createdAt") ;
    return res.json(200,{
                        message :"List of posts",
                        posts :posts
    })
}
module.exports.destroyPost = function(req ,res)
{
    Post.findById( req.params.id , 
        function(err,post)
        {
           try{
               if(post.user == req.user.id)
               {
               post.remove();
               Comment.deleteMany({post:req.params.id} , function(err)
               {
                   if (err)
                   {
                       console.log("error in deleting post")
                       
                   }
                   console.log("no error")
                } );
             
                     return   res.json(200,{
                                             post_id:req.params.id,  
                                            "message":"successfully deleted post and associated comments"})
                   
                     }
                     else
                     {
                         return res.json(401 ,{message:"UNAUTHORIZED: you cannot delete this post"});
                     }
            
           
                }
                catch(err)
              { 
                  console.log("error in catch ",err)
               return res.json(500,{
                                    message:"internal server error"
               });}
           
        } );
}

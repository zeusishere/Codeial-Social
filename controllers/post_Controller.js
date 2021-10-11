const Post = require("../models/post");
const Comment = require ("../models/comment");

module.exports.createPost = async function (req ,res)
{
    try{
   let post= await Post.create( {  
                    content : req.body.content ,
                    user :req.user._id ,
                    });
                   
                      
                       if(req.xhr)
                       {
                         
                        // req.flash("success","Successfully created post ")
                          return res.json(200,{"post":post  ,
                                         message:"Post successfully created"})
                       }
   
                     console.log("post is ",post);
                       req.flash("success","Successfully created post ")
                       return res.redirect("back");
                    }
                catch(err)
                {
                   
                           console.log("error in creating a post");
                           req.flash("success","error in creating post ")
                           return res.redirect("back");
                       
                }
};


//delete a post ans all comments associated with it
module.exports.destroy =async function (req ,res)
{
    
   console.log('req reached here')
    console.log(req.xhr);
    // try{
    //     let post = await Post.findById(req.params.id);

    //     if (post.user == req.user.id){
    //         post.remove();

    //         await Comment.deleteMany({post: req.params.id});


    //         if (req.xhr){
    //             console.log("we have reached inside xhr",req.xhr);
    //             return res.status(200).json({
    //                 data: {
    //                     post_id: req.params.id
    //                 },
    //                 message: "Post deleted"
    //             });
    //         }

    //         req.flash('success', 'Post and associated comments deleted!');

    //         return res.redirect('back');
    //     }else{
    //         req.flash('error', 'You cannot delete this post!');
    //         return res.redirect('back');
    //     }

    // }catch(err){
    //     req.flash('error', err);
    //     return res.redirect('back');
    // }







    // check if post exists in database
    Post.findById( req.params.id , 
                 function(err,post)
                 {
                    if (post.user == req.user.id  )
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
                        if(req.xhr)
                            { console.log("got here")
                              return   res.json(200,{
                                post_id:req.params.id,  
                                "message":"successfully deleted post"})
                            }
                            req.flash("success","Successfully deleted posts and assocaited comments ")
                      return res.redirect("back");
                    }
                    else
                    {
                        console.log("user not authorized to delete post ")
                        return res.redirect("back");
                    }
                 } );
};
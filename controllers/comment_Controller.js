const Comment = require("../models/comment");
const Post = require("../models/post") ;
const commentMailer = require("../mailers/comments_mailer") ;
const commentEmailWorker= require("../workers/comment_email_worker") ;
const queue = require("../config/kue");
module.exports.createComment =async function (req,res)
{
    // res.redirect("/user/profile")
        // console.log(req.body.post)
       
        Post.findById(req.body.post, function(err ,post)
        {
            if(post)
            {
                console.log("inside post")
            Comment.create({
                                    content:req.body.content,
                                    post:req.body.post,
                                    user:req.user._id ,
                                },
                                async function(err,comment)
                                {
                                    // handle error later
                                    //updating a document in post model
                                    if (err)
                                    console.log("error in creating a comment")
                                    post.comments.push(comment);
                                    post.save();
                                    comment= await   comment.populate("user","name email").execPopulate() ;
                                    //send a mail when  a cooment is populated
                                                //commentMailer.newComment(comment);
                                                let job = queue.create("emails", comment).save(function(err)
                                                {
                                                    if (err)
                                                    {
                                                        console.log("error in sending to queue ",err);
                                                        return ;
                                                    }
                                                    console.log("job enqueued", "\n job.id is ",job.id)
                                                } )

                                    if(req.xhr)
                                    {
                                    
                                     console.log(comment) ;
                                     return   res.status(200).json({message:"comment successfully created",
                                        comment : comment
                                    })
                                    }
                                    res.redirect("/");
                                } ) ;
                            }
        });
   
};
module.exports.destroy = function (req,res)
{
    //find the comment with id passed in params
    Comment.findById(req.params.id , function(err ,comment )
    {
        //check if owner of comment is same as the user making the delete request
        if(comment.user == req.user.id)
        {
            let postId= comment.post ;
            comment.remove();
            // to delete refernce to delete comment from comments array in respective Post
            Post.findByIdAndUpdate(postId ,{ $pull : {comments :req.params.id} },function(err ,post)
            {
                return res.redirect ('back');
            } );
        }
        else
        {
            console.log("user is not authorized to delete comment");
            return re.redirect ('back');

        }
    } )
}
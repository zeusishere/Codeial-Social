
let btn = $("#create-post");
// console.log(btn)
let newPostForm = $("#new-post-form");
console.log("newPostForm  ", newPostForm)
newPostForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: '/post/create',
        data: newPostForm.serialize(),
        success: function (data) {


                new Noty ({
                            theme : "relax",
                            text : `Post added` ,
                            type :"success",
                            layout:'topRight',
                            timeout :1500
                }).show()


           console.log(data);
           let newPost= createPostDom(data);
           console.log($("#posts-list-container > ul"))
           $("#posts-list-container>ul").prepend(newPost);
           console.log("hello ",$('.delete-post-link' , newPost))
           deletePost($(' .post-delete-link' , newPost) )


        },
        error: function (err) {
            console.log(err.responseText);
        }
    })
});


let createPostDom = function (post) 
{
return $(`<li id="post-${post.post._id}">
    <p>
    ${post.post.content}
        <br>
        ${post.post.username}
    </p>
        
    <!-- delete button for posts -->

        <small><a href="/post/destroy/${post.post._id}" class=" post-delete-link delete-post-button" >delete</a></small>

        <div class="post-comments">

            <form action="/comment/create" method="POST" class="new-comment-form">
                <textarea name="content" id="" cols="30" rows="2" placeholder="type here to add comment" required></textarea>
                <input type="hidden" name="post" value="${post.post._id}">
                    <button type="submit" id="create-comment">comment now</button>
            </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">

                    </ul>
                </div>
    </div>
</li>`)
}






$(".layout").click(function(e)
{
    e.preventDefault();
} )

let deletePost = function(deleteLink)
{
    console.log("prevent Default") ;
    $(deleteLink).click(function(e)
    {

        e.preventDefault() ;
        
        console.log($(e.target).prop("href"));
        $.ajax({
            type  :"get" ,
            url:$(e.target).prop("href"), 
            success:function(data)
            {
                console.log(data.message
                    );
                    $(`#post-${data.post_id}`).remove();
                    new Noty ({
                        theme : "relax",
                        text : `Post deleted` ,
                        type :"error",
                        layout:'topRight',
                        timeout :1500
            }).show()
                    
            },
            error : function(err)
            {
                console.log("err.responseText")
            }

        }
        )

    } )
};
let deletelinks = $(".post-delete-link");
console.log(deletelinks);
for (let deletelink of deletelinks)
{
    deletePost(deletelink);


}






   
    // method to delete a post from DOM
    // let deletePost = function (deleteLink) {
    //     $(deleteLink).click(function (e) {  // Even this works -->> deleteLink.click(function(e){
    //         e.preventDefault();
    //             console.log("cn ans ",$(deleteLink).prop('href'))
            // $.ajax({
            //     type: 'get',
            //     url: $(deleteLink).prop('href'),
            //     success: function (data) {
            //         $(`#post-${data.data.post_id}`).remove();
            //         new Noty({
            //             theme: 'relax',
            //             text: "Post Deleted",
            //             type: 'success',
            //             layout: 'topRight',
            //             timeout: 1500

            //         }).show();

            //     }, error: function (error) {
            //         console.log(error.responseText);
            //     }
            // });

    //     });
    // }



    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    // let convertPostsToAjax = function () {
    //     $('#posts-list-container>ul>li').each(function () {
    //         let self = $(this);
    //         let deleteButton = $(' .delete-post-button', self);
    //         console.log("#######", deleteButton);
    //         deletePost(deleteButton);

    //         // get the post's id by splitting the id attribute
    //         let postId = self.prop('id').split("-")[1];
    //         new PostComments(postId);
    //     });
    // }





    // convertPostsToAjax();




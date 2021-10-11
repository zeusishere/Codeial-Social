let allCommentForms = $(".new-comment-form") ;
console.log("all comment forms ",allCommentForms);
// sends data to server via ajax
let preventAction = function(element)
{
    console.log("$(element) ", $(element))
    $(element).submit(function(event)
    {
        event.preventDefault();
        // event.stopPropagation();
        $.ajax({
                type:"POST",
                url :"/comment/create",
                data:$(element).serialize(),
                success:function(data)
                {
                    let newComment = addComment(data.comment)
                    $(`#post-comments-${data.comment.post}`).prepend(newComment);
                },
                error :function(error)
                {
                    console.log(error.responseText);
                }
        })
    })
};



let addComment = function (comment)
{
    return $(`<li id="comment-${comment._id}" >
    <p>
        ${comment.content}
        <br>
        <small>${comment.user.name}</small>
    </p>
    
        <small><a href="/comment/destroy/${comment._id}" class="comment-delete-link" >delete comment</a></small>
        
</li>`);
}
for (let element of allCommentForms)
{
    console.log("element is ",element)
    preventAction(element);
}
// preventAction(allCommentForms);

// 

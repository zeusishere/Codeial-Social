const nodeMailer = require("../config/nodemailer") ;


exports.newComment = (comment) => // comment is an object of db model comment
{
    // html string stores the rendered email
    let htmlString = nodeMailer.renderTemplate({comment:comment} ,'/comments/new_comment.ejs') // realtive path to locate email ejs template
    console.log(" inside newComment mailer ," ,comment);
    nodeMailer.transporter.sendMail({
                                    from : "Codeial" ,
                                    to : comment.user.email,
                                    subject : "New Comment Published" ,
                                    html :htmlString
   
}, (err ,info) => // callback for sendMail
{
    if (err)
    {
        console.log("error in sending mail ",err)
        return ;
    }
    console.log("message senr ", info)
} )
}
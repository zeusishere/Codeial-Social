// imports
const nodemailer = require("nodemailer");
const path = require("path") ;
const ejs = require("ejs");
// transporter is going to be an object that is able to send mail
let transporter = nodemailer.createTransport({

                                                service:"gmail",
                                                host:"smtp.google.com",
                                                port: 587,
                                                secure:false,
                                                // username and password to login in host
                                                auth:{
                                                        user :"shubhamstudy12@gmail.com",
                                                        pass:"Royalstag18",
                                                }
                                            });
                                            //renders ejs template
let renderTemplate = (data,relativePath) =>
{  // what is relative path
    // relative path is used to locate the ejs template of email to be rendered
    let mailHTML ;
    ejs.renderFile( 
                        path.join(__dirname , "../views/mailers", relativePath),
                        data, //data serves as context
                        function(err, template) // template is the rendered template ; callback is used to show error if any while rendering a template or return rendered template
                        {
                            if(err)
                            {
                                console.log("error in rendering template  ", err);
                                return ;
                            }
                            mailHTML=template ;
                        } )
                        return mailHTML ;
}
module.exports ={
    transporter : transporter ,
    renderTemplate : renderTemplate
}
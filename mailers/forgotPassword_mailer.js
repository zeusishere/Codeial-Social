const nodeMailer = require("../config/nodemailer") ;
exports.newForgotPassword({email,accessToken})
{
    console.log("inside forgot password mailers")
    nodeMailer.transporter.sendMail(
                                    {
                                                                from : "Codeial" ,
                                                                to : email,
                                                                subject : "Update Password" ,
                                                                html :"password reset email"
                                    } ,
                            function(err, info)
                            {
                                if (err)
                                    {
                                        console.log("error in sending mail ",err)
                                        return ;
                                    }
                                    console.log("message sent ", info)
                            }

    )
}
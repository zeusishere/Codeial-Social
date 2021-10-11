const queue = require("../config/kue");
const forgotPasswordMailer =require("../mailers/forgot_password_mailer") ;
queue.process("forgotPasswordEmails", function(job ,done)
{
    console.log("sending forgot password mail ", job.data);
    forgotPasswordMailer.newForgotPassword(job.data);
    done();
})
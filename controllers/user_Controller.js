const User = require("../models/user")
const forgotPasswordMailer = require("../mailers/forgotPassword_mailer");
const forgotPasswordWorker = require("../workers/forgot_password_worker");
const queue = require("../config/kue");
module.exports.signup = function(req,res)
{
    if (req.isAuthenticated() )
    {
        return res.redirect("/user/profile")
    }
    res.render("signUp.ejs", {
        title :"codeial | sign up"
    });
    // res.send("yoyoyoyo")
} ;
module.exports.signin = function(req,res)
{
    if (req.isAuthenticated() )
    {
        return res.redirect("/user/profile")
    }
    res.render("signin.ejs", {
        title :"codeial | sign in"
    });
   
} ;
module.exports.createUser =function(req,res)
{
    console.log(req.body);
    // res.redirect("back");
    if(req.body.password != req.body.confirm_password)
    {
        console.log("password did not match") ;
        res.redirect("back");
        return ;
    }
    User.findOne({email:req.body.email} , function (err ,user) 
    {
        if (err)
        {
            console.log("error in finding user in db for sign up") ;
            return ;
        }
        if(!user)
        {

            User.create( req.body , function(err ,user)
            {
                if(err)
                {console.log("error in creating user");
                return ;}
                console.log(user) ;
                res.redirect('/user/sign-in') ;
            } );
        }
        else
        {
            console.log("user already exists") ;
            res.redirect('back') ;
        }
    } );
}
module.exports.createSession =function(req,res)
{
    req.flash("success","Logged in Successfully");
    return res.redirect('/');
}

// display's user profile
module.exports.userProfile =function(req,res)
{
    User.findById(req.params.id , function(err,user)
    {
        return res.render("./profile",{title:"profile",profile_user:user});
    })
    // return res.render("./profile",{title:"profile"});
}
module.exports.destroySession = function(req,res)
{
    req.logout();
    req.flash("success","Logged Out Successfully");
    res.redirect('/');
}
module.exports.updateUserDetails = function(req ,res)
{
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,{name:req.body.name, email:req.body.email},function(err,user)
        {
            res.redirect('back');
        })
    }
    else
    {
        res.status(500).send("unauthorized access")
    }
}
// forgot passowrd
module.exports.forgotPassword = function(req ,res)
{
    res.render("forgotPassword.ejs",{title:"Forgot Password"})
}
module.exports.formForgotPassword = async function(req ,res)
{
    console.log(req.body);
   let user= await User.findOne({email:req.body.email});
   if (user)
   {
       let job =queue.create("forgotPasswordEmails",{email:req.body.email,accessToken:"123"}).save(function(err)
                                                                    {
                                                                        if (err)
                                                                        {
                                                                            console.log("error in sending to queue ",err);
                                                                            return ;
                                                                        }
                                                                        console.log("job enqueued", "\n job.id is ",job.id)
                                                                    }
                                                               )
        req.flash("success","please check your Email inbox for Password reset Link");
        return   res.redirect("/");
   }
   req.flash("success","invalid Email");
  return  res.render("forgotPassword.ejs",{title:"Forgot Password"}) ;
}
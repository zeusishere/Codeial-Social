const express= require("express");
const router = express.Router();
const userController  = require("../controllers/user_Controller") ;
//require passport
const passport = require("passport");

// router.get("/",userController.profile);
router.get("/sign-up",userController.signup );
router.get("/sign-in",userController.signin );
router.post("/create" ,userController.createUser  );
router.post("/create-session",passport.authenticate('local',{failureRedirect:"/user/sign-in"}) ,userController.createSession) ;
router.get("/profile/:id" ,passport.checkAuthentication ,userController.userProfile );
router.get("/sign-out",userController.destroySession) ;
router.post("/update/:id" ,passport.checkAuthentication ,userController.updateUserDetails );
router.get("/forgot-password",userController.forgotPassword);
router.post("/forgot-password",userController.formForgotPassword);

module.exports = router ;
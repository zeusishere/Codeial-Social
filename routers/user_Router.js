const express= require("express");
const router = express.Router();
const userController  = require("../controllers/user_Controller") ;


router.get("/sign-up",userController.signup );
router.get("/sign-in",userController.signin );
router.post("/create" ,userController.createUser  );// to do something

module.exports = router ;
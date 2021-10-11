const express= require('express') ;
const router =express.Router() ;
const  passport = require("../config/passport-local-strategy" ) ;

const postController = require("../controllers/post_Controller") ;
router.post('/create', passport.checkAuthentication , postController.createPost);
router.get('/destroy/:id', passport.checkAuthentication,postController.destroy);




module.exports = router ;
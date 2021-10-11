const express= require('express') ;
const router =express.Router() ;
const  passport = require("../config/passport-local-strategy" ) ;
const commentController = require("../controllers/comment_Controller");

router.post("/create",passport.checkAuthentication,commentController.createComment);
router.get('/destroy/:id', passport.checkAuthentication,commentController.destroy);
module.exports = router ;
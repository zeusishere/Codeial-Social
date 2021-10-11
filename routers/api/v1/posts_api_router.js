const express= require("express");
const postAPI = require("../../../controllers/api/v1/post_api")
const passport = require("passport")

const router = express.Router();
router.get("/",postAPI.index);
router.get("/:id",passport.authenticate("jwt",{session:false}),postAPI.destroyPost);
module.exports = router ;
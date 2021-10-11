const express= require("express");
const router = express.Router();
const homeController = require("../controllers/home_Controller")
router.get("/" , homeController.home)
router.use("/user", require("./user_Router")) ;
router.use("/post", require("./post_Router"))
router.use("/comment", require("./comment_router"))
router.use("/api", require('./api/api_router')) // doubt here
module.exports = router ;
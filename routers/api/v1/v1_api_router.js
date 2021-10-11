const express= require("express");
const router = express.Router();
router.use("/post",require("./posts_api_router"))
router.use("/user",require("./users_api_router"))
module.exports = router ;
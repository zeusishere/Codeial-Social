const express= require("express");
const router = express.Router();
router.get("/" , (req,res) => { 
    console.log(req.cookies);
    res.cookie("user","not shubham");
    return res.send("<h2>Hello</h2>")
} );
router.use("/user", require("./user_Router")) ;

module.exports = router ;
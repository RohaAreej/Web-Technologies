var express = require('express');
var router = express.Router();

//get details
router.get("/",async(req,res)=>{
    return res.send(["Pen","Pencil"]);

});
module.exports = router;
const express = require("express");
const router = express.Router();
const {User} = require("../models/users");
const userAuth = require("../middleware/authorize");

router.post("/getInfo",userAuth,(req,res)=>{

    console.log(req.email);
    User.findOne({email : req.email},(err,docs)=>{
        if(err){
            console.log("Some error occured");
            res.status(500).json({success : false, msg : "Some server error"});
        }
        else{
            console.log(docs);
            const body = {
                email : docs.email,
                username : docs.username,
                wins : docs.wins,
                name : docs.name,
                losses : docs.losses
            }
            res.status(200).json({success : true, profile : body});
        }
    })

});


module.exports = router;
const express = require("express");
const router = express.Router();
const {User} = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");

//Sign in 

router.post("/signin",(req,res, next)=>{
    
    let getUser;
    var message = ""
    User.findOne({email : req.body.email})
    .then(user =>{
        if(!user){
            message = "Email is not registered";
        }
        getUser = user
        return bcrypt.compare(req.body.password,user.password);//then returns another promise.This can be used to create promise chains. Here bcrypt.compare is the promise.Promises resolve into a single value.
    }).then((response)=>{
        if(!response){
            //console.log(getUser);
            return res.status(200).json({success : false, message : "Incorrect Password"});
            
        }
        let jwtToken = jwt.sign({
            email : getUser.email,
            userId :getUser._id
        },"SecRETsArEhARDtokEeP",{expiresIn : "15m"});
        res.status(200).cookie("userToken",jwtToken).json({
            success:true,
            msg : getUser,
            token:jwtToken
        });
        console.log("Signed in! as " + req.body.email);
    
    })
    .catch((err)=>{
        res.status(401).json({success : false, message : message})
    })
})

//Sign up


//bcrypt.has(a1, salt rounds) when specified without callback, returns a promise. Hence it can be used along with .then(). If the callback is specified, we must run bcrypt.hash inside a promise function with async await

//for functions/actions which do not return a promise, we can create a callback function, which returns a promise. In the promise we write the functionality of the original function, and resolve/reject based on whether the result was obtained or not.

//findOne returns a promise which must be handled. Either by callback or ,then.catch chains. Signup uses callback and signin uses the promise chains.

router.post("/signup",(req,res)=>{

    User.findOne({email : req.body.email},(err,doc)=>{
        if(doc){
            console.log("Email is already registered, try signing in.");
            res.status(500).json({success : false, message : "Email already exists"})
            return;
        }
        else {

            bcrypt.hash(req.body.password,10)
            .then((hash)=>{
                console.log("Hashed password successfully");
                const user = new User({
                    name : req.body.name,
                    username : req.body.username,
                    email : req.body.email,
                    password : hash
                })
                user.save().then((doc)=>{
                    console.log(`Successfully added ${req.body.username} to database` );
                    res.status(200).json({success : true,result : doc});//save(), if successful resolves the promise to the saved document.
        
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({success : false, message : "failed to signup"});
                })
            })}
        })
    });

router.post("/authorize",authorize);

module.exports = router;
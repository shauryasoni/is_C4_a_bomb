const jwt = require("jsonwebtoken");



module.exports = (req,res)=>{
    const old_token = req.cookies["userToken"];
    if(!old_token){
        console.log("Logged out");
        res.status(200).json({success : false, msg : "User Logged out"})
    }
    else{
        
       // var date = (new Date()).getTime()/1000;
        jwt.verify(old_token,"SecRETsArEhARDtokEeP",(err,decoded)=>{
            if(err){
                console.log("Invalid jwt token.");
                res.status(401).json({success:false, msg:"Invalid jwt token"})
            }
            else{
                console.log("Received Valid token. Issuing New token");
                console.log();
               // console.log(date);
                const payload = {
                    email : decoded.email,
                    userId :   decoded.userId
                }
                const new_token = jwt.sign(payload,"SecRETsArEhARDtokEeP",{expiresIn:"2m"});
                //console.log(new_token);
                res.status(200).cookie("userToken",new_token).json({success : true});
            }
    })
}}
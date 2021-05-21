const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{
    const token = req.header("x-auth-token");
    jwt.verify(token,"SecRETsArEhARDtokEeP",(err,decoded)=>{
        if(err){
            console.log("invalid Token");
            res.status(200).json({success : false, msg: "Failed to authorize token"});
        }
        else{
            console.log(token);
            res.status(200).json({success:true,msg:"Authorized"});
        }
    });
}
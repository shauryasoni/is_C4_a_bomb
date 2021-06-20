const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{
    const token = req.cookies["userToken"];
    console.log(token);
    jwt.verify(token,"SecRETsArEhARDtokEeP",(err,decoded)=>{
        if(err){
            console.log("invalid Token");
            res.status(401).json({success : false, msg: "Failed to authorize token"});
        }
        else{
            //console.log(token);
            console.log(decoded);
            req.email = decoded.email;
            console.log(req.email);
            next();
        }
    });
}
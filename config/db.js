const mongoose = require("mongoose");


const connect = ()=>
{ 
    mongoose.connect(process.env.MONGO_URI,
    {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
    }).then(()=>{
        console.log("Connected to mongodb")
    }).catch((err)=>{
        console.log("Failed to connect to mongodb")
        process.exit(1);
    })
    mongoose.connection.on("disconnected", ()=>{console.log("Disconnected from server")})
};
module.exports = connect;

//'mongodb://localhost:27017/test'

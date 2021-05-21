const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path= require("path");
const authenticate = require("./routes/authroutes");


dotenv.config({path : "./config/config.env"})
connectDB();

const app = express();
app.use('/',express.static(path.join(__dirname, '../client/src')))



app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(cors());
app.use("/api/auth",authenticate);

app.get("/", (req,res)=>{
    res.json({msg:"UI linked to backend"})
    //res.sendFile('/client/src/index.html',{root:"/home/shaurya/Desktop/rct/login_sys"});
})
const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authenticate = require("./routes/authroutes");
const userRoutes = require("./routes/user");
var cookieParser = require("cookie-parser");

dotenv.config({path : "./config/config.env"})
connectDB();

const app = express();
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));

app.use("/api/auth",authenticate);
app.use("/api/user",userRoutes);

app.get("/api/root", (req,res)=>{
    res.cookie("UI","Linked").json({msg:"UI linked to backend"})
    //res.sendFile('/client/src/index.html',{root:"/home/shaurya/Desktop/rct/login_sys"});
})
const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
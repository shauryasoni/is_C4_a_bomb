import React,{useEffect} from "react"; 
import "./HomePage.css";
//import axios from "axios";
import Profile from  "./PageSections/Profile/Profile"


function HomePage(){

 
    useEffect(()=>{
        console.log("In home page");
        return(()=>{console.log("Re rendering home")})
    });

    return(
        <div className="homecontainer">

            <div className="hometitle">
                <h1>That's where you want to be </h1>
            </div>

            <div className="page"> 

                <div className="profile">
                <Profile></Profile> 
                </div>

                <div className="focus">
                    focus
                </div>

                <div className="leaderboard">
                    leaderboard
                </div>

            </div>
        </div>
    )
}

export default HomePage;
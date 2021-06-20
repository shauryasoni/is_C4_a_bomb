import React from "react";
import "./LandingPage.css";
import {useHistory} from "react-router-dom"


function LandingPage(){
    const history = useHistory();

    return(
        <>
        <div className="outer">
            <div className="wrapper">
                <div className="title">
                    Get Started!
                </div>
                <div className="choice">
                    <button className="option" onClick={()=>{history.replace("/login")}}>
                        Log In
                    </button>
                    
                    <button className="option" onClick={()=>{history.replace("/signup")}}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage;
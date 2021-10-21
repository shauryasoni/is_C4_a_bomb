import React from 'react';
import "./navBar.css"
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";

function NavBar(props){

    var auth="no";
    if(props.auth){
        auth="yes";
    }
    const history = useHistory();

    const handleClick = ()=>{

        if(props.auth){
            Cookies.remove("userToken");
        }
        else{
            history.replace("/login")
        }

    };
    const handleSignup = ()=>{
        history.replace("/signup");
    }


    return (
        <div  className="nav" >

          <div className="homecard" onClick={()=>{ props.auth?history.replace("/home") : history.replace("/") }}>
              Home
          </div>

          <div className="navlinks">
              <div className={`sortofcards ${auth}`} onClick={handleSignup}>

                    {props.auth? "":"Signup"}
              </div>
              <div className="sortofcards" onClick={handleClick}>

                    {props.auth? "LogOut" : "LogIn"}

              </div>


          </div>

        </div>
    )
}
export default NavBar;
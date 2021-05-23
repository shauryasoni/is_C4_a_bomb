import React, { useEffect,useState } from 'react';
import './App.css';
import {Switch, Route,useHistory} from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar/navBar"
import SignUpPage from "./components/SignUpPage/SignUp"
import LoginPage from "./components/LoginPage/Login";
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage"
import Cookies from "js-cookie";

function App() {

  const history = useHistory();
  console.log(history);
   
  const [User,setUser] = useState(Cookies.get("userToken"));
  const [Auth, setAuth] = useState(false);

  const authorize = ()=>{
      console.log("Form checked. User Authed.");
      setAuth(true);
      setUser(Cookies.get("userToken"));
  }

  const checkUser = ()=>{
    
    if(Cookies.get("userToken")){
      setUser(Cookies.get("userToken"));
      setAuth(true);
    }
    else{
      setUser(undefined);
      setAuth(false);
    }
  }

  setInterval(checkUser,2000);

  useEffect(()=>{
        
    checkUser();
    console.log("User is "+ User);

    axios.get("http://localhost:5000",{withCredentials:true}).then((response)=>{
      console.log(response.data.msg);
    }).catch(err=>{
      console.log(err);
      console.log("what is going on ")
    });

    if(!Auth){
      history.replace("/");
    }
    else{
      history.replace("/home");
    }

  },[User,Auth]);
  

  
  return (
    <div style={{height:"100vh",border: "groove"}}>
    <NavBar auth={Auth} />
    <Switch >
      <Route exact path="/"><LandingPage /></Route>
      <Route exact path = "/signup" auth={Auth}><SignUpPage /></Route>
      <Route exact path="/login" ><LoginPage isAuth={authorize}  /></Route> 
      <Route exact path="/home"><HomePage /></Route> 
    </Switch>
   
    </div>
  )}
export default App;

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

   
  const [User,setUser] = useState(Cookies.get("userToken"));
  //const [Auth, setAuth] = useState(User?true:false);  Removing Auth state variable

  const authorize = ()=>{

      console.log("Setting cookie value..");
      //setAuth(true);
      setUser(Cookies.get("userToken"));
  }

  const checkUser = ()=>{
    
    console.log("Checking Cookie...")
    if(Cookies.get("userToken")){
      //setUser(Cookies.get("userToken"));
      //setAuth(true);
    }
    else{
      setUser(undefined);
      //setAuth(false);
    }
  }

  const refresh_token = ()=>{

    console.log("sending refreshtoken");
    axios.post("/api/auth/refresh_token",{withCredentials:true})
    .then(response=>{
      if(response.data.success){
        authorize();
      }
      else{
        console.log(response.data.msg);
      }
    })
    .catch(err=>{
      console.log("Failed to refresh token");
      Cookies.remove("userToken");
      //setAuth(false);
    })
  }

  function poll(){
    setInterval(checkUser,2000);
  }
  function refresh(){
    setInterval(refresh_token,90000);
  }

  useEffect(()=>{
    
    console.log("User is "+ User);
    //console.log(Auth);
    if(!User){
      history.replace("/");
    }
  },[User])

  useEffect(()=>{
    refresh_token();
    refresh();
    
    poll();
    axios.get("/api/root",{withCredentials:true}).then((response)=>{
      console.log(response.data.msg);
    }).catch(err=>{
      console.log(err);
      console.log("what is going on ")
    });
    
    if(!User){
      Cookies.remove("userToken");
    }
    
  },[])

  useEffect(()=>{
    console.log("App rendered");
    return(()=>{console.log("Re rendering App")})
  })
  

  
  return (
    <div >
    <NavBar auth={User} />
    <Switch >
      <Route exact path = "/signup" auth={User}><SignUpPage /></Route>
      <Route exact path="/login" >   {User?<HomePage /> :<LoginPage isAuth={authorize}  />}  </Route> 
      <Route exact path="/home"><HomePage /></Route> 
      <Route exact path="/">    {User?<HomePage />:<LandingPage />}    </Route>
    </Switch>
   
    </div>
  )}
export default App;

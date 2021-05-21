import React, { useEffect } from 'react';
import './App.css';
import {Switch, Route,useHistory} from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar/navBar"
import SignUpPage from "./components/SignUpPage/SignUp"
import LoginPage from "./components/LoginPage/Login";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const history = useHistory();
  console.log(history);


  useEffect(()=>{
    axios.get("http://localhost:5000").then((response)=>{
      console.log(response.data.msg);
    }).catch(err=>{
      console.log(err);
      console.log("what is going on ")
    })
  })
  

  
  return (
    <div style={{height:"100vh",border: "groove"}}>
    <NavBar></NavBar>
    <Switch >
      <Route exact path = "/" > <SignUpPage /></Route>
      <Route exact path="/login"><LoginPage /></Route> 
      <Route exact path="/home"><HomePage /></Route> 
    </Switch>
   
    </div>
  )}
export default App;

import React,{useEffect,useState} from "react";
import axios from "axios";
import "./SignUp.css"
import { useHistory } from "react-router-dom";

var Name=""; var nameValid=false;
var Email="";var emailValid=false;
var Username="";var usernameValid = false;
var Password1 ="";var pass1Valid=false;
var Password2="";var pass2Valid = false;
var passEqual = false;

function SignUp(props){

    const history = useHistory();

   const [FormValid, setFormValid] = useState(false);
   const [ShowError1,setShowError1]= useState("initial");
   const [ShowError2,setShowError2]= useState("initial");
   const [ShowError3,setShowError3]= useState("initial");
   const [ShowError4,setShowError4]= useState("initial");
   const [ShowError5,setShowError5]= useState("initial");
   const [ShowError6,setShowError6]= useState("initial");



   useEffect(()=>{
        console.log("/useEffect");
        
        if(FormValid){
            submit();  //the state variables were not updating on time. Used useEffect and then called the function which required the updated values.
        }
        else{
            console.log("Form is invalid");
        }
      },[FormValid]);

      const validate = (e)=>{
           e.preventDefault();
           console.log(Name);
           if(Name===""){
               setShowError1("show");
               nameValid=false;
           }
           else{
                setShowError1("noShow");
                nameValid=true;
           }
           console.log(Username);
           if(Username===""){
                setShowError2("show");
                usernameValid = false;
           }
           else{
                setShowError2("noShow");
                usernameValid = true;
           }
           console.log(Email);
            if(Email===""){
                setShowError3("show");
                emailValid = false;
           }
           else{
                setShowError3("noShow");
                emailValid = true;
           }
           console.log(Password1);
           if(Password1===""){
                setShowError4("show");
                pass1Valid = false;
           }
           else if(Password1.length<6){
               setShowError4("show");
               pass1Valid = false;
           }
           else{
               setShowError4("noShow");
               pass1Valid = true;
           }
           console.log(Password2);
           if(Password2===""){
                setShowError5("show");
                pass2Valid = false;
           }
           else if(Password2.length<6){
                setShowError5("show");
                pass2Valid = false;
            }
           else{
               setShowError5("noShow");
               pass2Valid = true;
           }
           if(Password1!==Password2){
                setShowError6("show");
                passEqual = false;
           }
           else{
               setShowError6("noShow");
               passEqual = true;
           }
          
            if(nameValid&&emailValid&&usernameValid&&pass1Valid&&pass2Valid&&passEqual){
                setFormValid(true);
            } 
            else{
                setFormValid(false);
            }
        }
      

      const submit =()=>{
    
          if(FormValid){
              console.log("Sending request now");
                const userobj={
                    name:Name,
                    username:Username,
                    email:Email,
                    password:Password1
                }
                
                axios.post("/api/auth/signup",userobj)
                .then((response)=>{
                    if(response.data.success){
                        alert("SignUp successful!")
                        console.log(response.data);
                        reset();
                        gotoLanding();
                    }
                }).catch((err)=>{
                    alert("Email exists! Try with another email or login instead");
                    setFormValid(false);
                })
            }
        }



      const handleNameChange=(e)=>{
        Name = e.currentTarget.value;
        
            
      };
      const handleUnameChange=(e)=>{
        Username = e.currentTarget.value;
        
    };
      const handleEmailChange=(e)=>{
        Email = e.currentTarget.value;
      
    };
      const handlePass1Change=(e)=>{
        Password1 = e.currentTarget.value;
        
    };
    const handlePass2Change=(e)=>{
        Password2 = e.currentTarget.value;
        
    };
    const gotoLanding =()=>{
        console.log(props);
        history.replace("/");
        
    }
    const reset = ()=>{
        
            Name="";
            Email="";
            Username="";
            Password1="";
            Password2="";
        
    }
      

    return(

        <div className="fContainer">

            <div className="inner">
                <h1 className="header" style={{textAlign:"center"}}>Sign Up!!!</h1><hr/>

                <form className="Form" onSubmit={validate}>

                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                                Name : 
                            </label>
                           
                                <input className="Name" type="text" onChange={handleNameChange}/>
                        </div>
                        <div className={`error ${ShowError1}`}>
                            * Name is a required field
                        </div>
                       
                    </div>

                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                                Username : 
                            </label>
                                <input className="Username" type="text" onChange={handleUnameChange}/>
                        </div>
                        <div className={`error ${ShowError2}`}>
                            * Username is a required field
                        </div>
                    </div>
                
                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                                Email : 
                            </label>
                                <input className="Email" type="email" onChange={handleEmailChange}/>
                            </div>
                        <div className={`error ${ShowError3}`}>
                            * Email is a required field
                        </div>
                
                    </div>
                    
                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                                Password : 
                            </label>
                                <input className="Password" type="password" onChange={handlePass1Change}/>
                        </div>
                        <div className={`error ${ShowError4}`}>
                            * Password1 is required. Must have more than 6 charaters.
                        </div>
                    </div>
                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                               Retype Password : 
                            </label>
                                <input className="Password" type="password" onChange={handlePass2Change}/>
                        </div>
                        <div className={`error ${ShowError5}`}>
                            * Password2 is required. Must have more than 6 charaters.
                        </div>
                        <div className={`error ${ShowError6}`}>
                            * Passwords do not match
                        </div>
                    </div>

                  

                    <div className="buttonDiv">
                        
                        <button  type="submit"className="Button">Submit</button>
                    </div>

            
                </form>
            </div>
         
       </div>
    )
}

export default SignUp;
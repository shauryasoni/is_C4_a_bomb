import React,{useEffect,useState} from "react"; 
import "./LoginPage.css"
import {useHistory} from "react-router-dom";
import axios from "axios";


var Email = ""; var emailValid = false;
var Password = ""; var passwordValid = false;

function Login(props){

    const history = useHistory();

    const [formValid, setFormValid] = useState(false);
    const [showError1, setShowError1] = useState("initial");
    const [showError2, setShowError2] = useState("initial");
    
    useEffect(()=>{

        if(formValid){
            submit();
        }
        else{
            console.log("Loginform is invalid");
        }
        
    },[formValid]);

    const validate= (e)=>{

            e.preventDefault();
            if(Email===""){
                setShowError1("show");
                emailValid = false;
            }
            else{
                setShowError1("noShow");
                emailValid = true;
            }
            if(Password===""){
                setShowError2("show");
                passwordValid =false;
            }
            else if(Password.length<6){
                setShowError2("show");
                passwordValid = false;
            }
            else{
                setShowError2("noShow")
                passwordValid =true;
            }
            if(passwordValid && emailValid){
                setFormValid(true);
            }
            else{
                setFormValid(false);
            }
        
    };

    const submit = ()=>{
        console.log("form is valid");
        const userobj = {
            email : Email,
            password : Password
        }
        console.log(userobj);
        axios.post("api/auth/signin",userobj,{withCredentials:true})
        .then((response)=>{
            if(response.data.success){
                console.log(response.data);
                props.isAuth();
                reset();
                gotoHome();
            }
            else{
                alert(response.data.message);
                setFormValid(false);
            }
        }).catch((err)=>{
            alert("Email not registered");
            setFormValid(false);
        });
        
    }
    


    const handleEmailChange = (e)=>{
        Email = e.currentTarget.value;
    };
    const handlePasswordChange = (e)=>{
        Password = e.currentTarget.value;
    }
    const gotoHome = ()=>{
        history.replace("/home");
    }
    
    const reset = ()=>{
        
        Email="";
        Password="";
    }

    return(
        <div className="fContainer">

            <div className="inner">
                <h1 className="header" style={{textAlign:"center"}}>Log In!!!</h1><hr/>

                <form className="Form" onSubmit={validate} >
                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                                Email : 
                            </label>
                                <input className="Email" type="email" onChange={handleEmailChange} />
                            </div>
                        <div className={`error ${showError1}`}>
                            * Email is a required field
                        </div>
                
                    </div>
                    
                    <div className="fieldWrapper">
                        <div className="field">
                            <label>
                                Password : 
                            </label>
                                <input className="Password" type="password" onChange={handlePasswordChange} />
                        </div>
                        <div className={`error ${showError2}`}>
                            * Password is required. Must have more than 6 charaters.
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
    


export default Login;
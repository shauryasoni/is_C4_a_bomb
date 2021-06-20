import React, {useEffect,useState} from "react";
import axios from  "axios";
import "./Profile.css";


function Profile(){


    const [profile,setProfile] = useState({});

    useEffect(()=>{
        let mount = true;
        console.log("Getting info");   //to avoid memory leaks. Keeps track of if the component is mounted or not.
        axios.post("/api/user/getInfo",{withCredentials : true})
        .then((response)=>{
            if(mount){
                setProfile(response.data.profile);
            }

        })
        .catch(err=>{
            console.log(err);
        })
        return(()=>{
            mount = false;
        })

    },[]);
    
    useEffect(()=>{
       console.log(profile) ;
    },[profile]);

    return(
        <div className="profilecontainer">
            <div className = "profileItem">
                {profile.name} 
            </div>
            <div className = "profileItem">
                {profile.username} 
            </div>
            <div className = "profileItem">
                {profile.email} 
            </div>
            <div className = "profileItem">
                {profile.wins} 
            </div>
            <div className = "profileItem">
                {profile.losses} 
            </div>
          
        </div>
    )

    


}

export default Profile;
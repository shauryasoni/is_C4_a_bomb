import React,{useEffect} from "react"; 



function HomePage(){


    useEffect(()=>{
        console.log("In home page");
    })

    return(
        <div> Home Page </div>
    )
}

export default HomePage;
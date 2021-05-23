let a = 10;
const p = ()=>{
    return new Promise((resolve,reject)=>{
    if(a != 10){
        resolve(a);
        
    }
    else{
        reject(a);
       
    }
})
};

p().then(()=>{console.log("works")}).catch(()=>{console.log("no")})



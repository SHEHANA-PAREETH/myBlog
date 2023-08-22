
function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
       
    }
    
  }


function doSignUp(){
    
    let formData={};
     formData.name=document.getElementById("name").value;
     formData.email=document.getElementById("email").value;
     formData.mobileno=document.getElementById("mob").value;
     formData.password=document.getElementById("password1").value;
     formData.confirmpass=document.getElementById("password2").value;
    
 console.log("formdata",formData);
 //call to particular route in js using fetch(promise,api call)
 fetch("/register",{
     method:"post",
    //json data
     headers:{
 "Content-Type":"application/json"
     },
     //convert object to json format("string format")
     body:JSON.stringify(formData)
 }).then((response)=>response.json())
 .then(data=>{console.log('signup front end');
 console.log(data);
    if(data.signup){
        window.location.href="/"
    }
    if(data.user){
       
        
        let errortext=document.getElementById("existError");
        errortext.classList.add("invalid");
    }
 })    
}
function doLogin(){

    let LoginData={}
    LoginData.email=document.getElementById("email").value
   
    LoginData.password=document.getElementById("password").value
fetch("/login",{
    method:'post',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(LoginData)
}).then((response)=>response.json())//diffrent format from back end to front end, to parse it to json format
.then((data)=>{
    console.log(data);
   if(data.login){
    if(data.active){
        
        window.location.href='/home'
    }
    else{
        document.getElementById("warning").innerHTML="You have been blocked"
    setTimeout(()=>{
        document.getElementById("warning").innerHTML=""
        window.location.href='/logout'
    },3000)
    }
   
   }
   else
   {
  
    document.getElementById("warning").innerHTML="invalid credentials"
    setTimeout(()=>{
        document.getElementById("warning").innerHTML=""
        window.location.href='/'
    },3000)
   
   }
       
})

}


function logout(){
    localStorage.clear()
    sessionStorage.clear()
    window.location.href='/logout'//location.assign('/signin')
}




const forgotpassword=()=>{
    let LoginData={}
    LoginData.email=document.getElementById("email").value
    LoginData.name=document.getElementById("name").value
    LoginData.pass1=document.getElementById("password1").value
    LoginData.pass2=document.getElementById("password2").value
    let reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
   if(LoginData.email==''||LoginData.name==''||LoginData.pass1==''||LoginData.pass2==''){
    document.getElementById("warning1").innerHTML="enter all fields"
    setTimeout(()=>{
        document.getElementById("warning1").innerHTML=""
    },2000)
   }

else{
    if(reg.test(LoginData.pass1)){
        if(LoginData.pass1!==LoginData.pass2){
            document.getElementById("warning2").innerHTML="Passwords don't match"
        setTimeout(()=>{
            document.getElementById("warning2").innerHTML=""
        },2000)
        }
       
          else{
             
            fetch("/createpassword",{
                method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(LoginData)
            }).then((response)=>response.json())//diffrent format from back end to front end, to parse it to json format
            .then(data=>{
                console.log(data);
               if(data.passwordUpdated){
                //bom property
                document.getElementById("message").innerHTML="Password updated suucessfully"
                setTimeout(()=>{
                    window.location.href='/'
                },2000)
               
               }
            else{document.getElementById("message").innerHTML="User doesn't exist, create new account"
                
            setTimeout(()=>{
                window.location.href='/signin'
            },5000)
           
            
            } })
                 
        }
    
    }
      
    else 
{
    let errortext=document.getElementById("passError");
        errortext.classList.add("invalid");
        setTimeout(()=>{
            errortext.classList.remove("invalid");
        },2000)

}

}
    
    
}   
    


const showImages=()=>{

    
    const imageInput=document.getElementById("imageInput");
    const imagePreview=document.getElementById('imagePreview');
    document.getElementById('imagePreview').innerHTML=''
    const selectedImages=imageInput.files;
    for(i=0;i<selectedImages.length;i++){
        const image=document.createElement('img')
        image.src=URL.createObjectURL(selectedImages[i])
            image.style.width='150px'
            image.style.margin="3px"
    imagePreview.appendChild(image)}
}


const editname=()=>{
    console.log('edit');
    let elein=document.getElementById('fname')
    elein.style.display='none'
    let ele=document.getElementById('editname')
    ele.style.backgroundColor='#FF8000'
    ele.style.color='white'
    let pro=document.getElementById('newprofile')
pro.classList.remove('profileview')
}

const changename=(nameId)=>{
    console.log(nameId);
    let ele=document.getElementById('oldname')
    ele.style.display='none'
    let elein=document.getElementById('fname')
    elein.style.display='block'
    
    
    elein.addEventListener("blur", myFunction);

    function myFunction() {
     console.log(elein.value); 
     let newname={}
     newname.id=nameId
     newname.name=elein.value;
     console.log(newname);
     fetch("/updatename",{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newname)
    }).then((response)=>response.json())
    //diffrent format from back end to front end, to parse it to json format
    .then((data)=>{
        console.log(data);
        if(data.updatedname){
            window.location.href='/home'
        }
        
    })
    
    }
   
    
   

}





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
 }).then((data)=>{
   window.location.href="/"
 })
}
function doLogin(){
    let LoginData={}
    LoginData.email=document.getElementById("email").value
    LoginData.name=document.getElementById("name").value
    LoginData.password=document.getElementById("password").value
fetch("/login",{
    method:'post',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(LoginData)
}).then((response)=>response.json())//diffrent format from back end to front end, to parse it to json format
.then(data=>{
   if(data.login){
    //bom property
    window.location.href='/home'
   }
else{document.getElementById("warning").innerHTML="invalid credentials"
    setTimeout(()=>{
        document.getElementById("warning").innerHTML=""
    },3000)

} })

}


function logout(){
    localStorage.clear()
    sessionStorage.clear()
    window.location.href='/logout'//location.assign('/signin')
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

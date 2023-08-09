
let validateName=()=>{
   
    let reg=/^[a-zA-Z ]+$/;
     let text=document.getElementById("name").value;
     let errortext=document.getElementById("nameError");
     if(reg.test(text)){
         console.log("success");
         errortext.classList.remove("invalid");
 return true;
     }
 else
 {
     console.log("fail");  
     errortext.classList.add("invalid");
     return false;
 }
     }
 /*let validateEmail=()=>{
     let reg=/^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9-_]{3,20})\.([a-z]{2,6}?$)/;*/
     let validateEmail=()=>{
    
         let reg=/^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9-_]{3,20})\.([a-z]{2,6}?$)/;
          let text=document.getElementById("email").value;
          let errortext=document.getElementById("emailError");
          if(reg.test(text)){
              console.log("success");
              errortext.classList.remove("invalid");
      return true;
          }
      else
      {
          console.log("fail");  
          errortext.classList.add("invalid");
          return false;
      }
          }
          let validateMob=()=>{
         console.log("success") 
             let reg=/^[0-9]{10}$/;
              let text=document.getElementById("mob").value;
              let errortext=document.getElementById("mobError");
              if(reg.test(text)){
                  console.log("success");
                  errortext.classList.remove("invalid");
          return true;
              }
          else
          {
              console.log("fail");  
              errortext.classList.add("invalid");
              return false;
          }
              }
            let  validatePassword=()=>{
             let reg=/^[a-zA-Z !@#$%^&*()0-9]+$/;
             let text=document.getElementById("password1").value;
             let errortext=document.getElementById("passError");
             if(reg.test(text)&&text.length>=8){
                 console.log("success");
                 errortext.classList.remove("invalid");
               return true;
             }
             
             else 
           {
             console.log("fail");  
             errortext.classList.add("invalid");
             return false;
           }
         }
         let confirmPassword=()=>{
             let text1=document.getElementById("password2").value;
             let errortext=document.getElementById("confirmpass-error");
         
             let text2=document.getElementById("password1").value;
             if(text1!==text2){
             errortext.classList.add("invalid");
         return false;}
         else{
             errortext.classList.remove("invalid");
         return true;}
         }
       
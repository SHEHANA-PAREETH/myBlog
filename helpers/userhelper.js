const USER=require("../models/usermodel").users
const mongoose=require('mongoose')




const getUserData=(userId)=>{
return USER.find({_id:userId},{password:0,mobileno:0})
}


    


module.exports=getUserData
const mongoose=require("mongoose")
//how to look user data and provide backend validation
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        //must have email
    },
     name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobileno:{
        type:Number,
        required:true,
    }
})

const users=mongoose.model("users",userSchema)

module.exports={users}
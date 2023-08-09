const mongoose=require('mongoose')


const adminSchema=mongoose.Schema({
    name:{
     type:String,
     required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
const admins=mongoose.model("admin",adminSchema)
module.exports=admins
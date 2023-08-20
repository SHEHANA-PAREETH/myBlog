const mongoose=require("mongoose")
const { users } = require("../models/usermodel")
const USER=require("../models/usermodel").users
const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    content:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true   
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:users
    },
    dateandtime:{
        type:String
    },
    images:[]
})
const blogs=mongoose.model("blogs",blogSchema)
module.exports=blogs
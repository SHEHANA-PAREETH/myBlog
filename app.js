const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const user=require("./router/user")
const admin=require("./router/admin")
const connectDB=require("./config/dbconfig")
const cookieParser=require('cookie-parser')
require('dotenv').config()


connectDB()


app.set("view-engine",hbs)
app.set("views",path.join(__dirname,"pages"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/',(req,res,next)=>{
    res.set("Cache-Control","no-store")
    next()
})
//convert json data
app.use(express.json())


app.use("/",user)
app.use("/admin",admin)


//app.listen(3000)
app.listen(process.env.PORT)
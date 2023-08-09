
const mongoose= require("mongoose")
const USER=require("../models/usermodel").users
const BLOGS=require('../models/blogschema')
const jwt=require('jsonwebtoken')
const multer=require('multer')


const showSignUp=(req,res)=>{
    if(req.cookies.userJwt)
    {
        res.redirect('/home')
    }
    else{
        res.render("user/signup.hbs")
        }
        

}

const showSignIn=(req,res)=>{
   
    if(req.cookies.userJwt)
    {
        res.redirect('/home')
    }
    else{
        res.render("user/signin.hbs")
        }
   
}
const doSignUp=(req,res)=>{
    console.log("at backend",req.body)
    //automatically user collection created
//db query like promise
    USER({
    email:req.body.email,
    name:req.body.name,
    mobileno:req.body.mobileno,
    password:req.body.password
}).save().then((res)=>{
    res.json({signup:true})//success res to back end
})    //like promise
.catch(()=>{
    res.json({signup:false})

})
}

const doLogin=(req,res)=>{
    console.log('logindatabackend',req.body);
//call schema
USER.find({
    email:req.body.email,//check user already exists in DB
    name:req.body.name,
    password:req.body.password,
    
}).then((response)=>
{
    console.log(response)//log the find data if not empty array return

if(response.length>0){//send the response to frontend .we have to convert it to json format
   

    const token=jwt.sign({userId:response[0]._id},process.env.JWT_KEY,{expiresIn:'2d'})
   
   res.cookie('userJwt',token,{
    httpOnly:true,
    samSite:'lax',
    secure:false,
    maxAge:24*60*60*1000
   })
    res.status(200).json({login:true})
}
else{
    res.json({login:false})
}

})
}


const showHomePage=(req,res)=>{
  BLOGS.find().then((response)=>{
    res.render('user/home.hbs',{data:response})
  })
}


const detailedViewPage=(req,res)=>{
    console.log(req.query);
BLOGS.find({_id:req.query.id})
.populate({
    path:'createdBy',
    select:['name','email']//show only users name and email
})
.then(response=>{
    //response[0].createdAt=new Date(response[0].createdAt)
   console.log(response);
   
    res.render('user/detailedview.hbs',{data:response[0]})
})
.catch(err=>{
    console.log("error");//design error page, try catch use cheyyuka
})
   
}

const logout=(req,res)=>{
    res.cookie('userJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1//1 milli second
       })
       
res.redirect('/signin')
}


const showUpload=(req,res)=>{

    res.render('user/upload.hbs')
}

const uploadPost=(req,res)=>{
    const fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/uploads')
        },
        filename:(req,files,cb)=>{
            cb(null,Date.now()+"-"+files.originalname)
        }
    })
    const upload=multer({storage:fileStorage}).array("images",4)
    upload(req,res,(err)=>{
    console.log(req.files);
    BLOGS({title:req.body.title,
        category:req.body.category,
        content:req.body.content,
        description:req.body.description,
        createdBy:req.query.id,//to print user uploading blog
       images:req.files}).save().then((response)=>{
res.redirect('/home')
 })
})
}
module.exports={showHomePage,showSignIn,showSignUp,doSignUp,doLogin,detailedViewPage,logout,showUpload,uploadPost}
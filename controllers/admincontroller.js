const mongoose=require('mongoose')
const ADMIN=require('../models/adminmodel')
const multer=require('multer')
const BLOGS=require('../models/blogschema')
const jwt=require('jsonwebtoken')
const path=require('path')
const fs=require('fs')
const USER=require("../models/usermodel").users




const showAdLogin=(req,res)=>{

    if(req.cookies.adminJwt)
    {
        res.redirect('/admin/home')
    }
    else{
        res.render("admin/login.hbs")
        }
        
}
const showPost=(req,res)=>{
    BLOGS.find()//use find one 
    .populate({
       path:'createdBy',
 select:['name','email']//show only users name and email
    })
     .then((response)=>{
    
        res.render('admin/post.hbs',{data:response})
      })
}

const adHome=(req,res)=>{
    res.render('admin/home.hbs')
  }



const uploadPage=(req,res)=>{
    res.render('admin/upload.hbs')
}

const doAdLogin=(req,res)=>{
ADMIN.find({
    
    name:req.body.name,
    password:req.body.password,
    
}).then((response)=>
{
    console.log(response)//log the find data if not empty array return

if(response.length>0){//send the response to frontend .we have to convert it to json format
   

    const adtoken=jwt.sign({aminId:response[0]._id},'adminkey',{expiresIn:'2d'})
   
   res.cookie('adminJwt',adtoken,{
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



const createBlog=(req,res)=>{
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
       images:req.files}).save().then((response)=>{
res.redirect('/admin/home')
 })
})}


const adLogout=(req,res)=>{
    res.cookie('adminJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1//1 milli second
       })
       
res.redirect('/')
}

const deletePost=(req,res)=>{
   
 try{
    console.log(req.body)
    BLOGS.findOne({_id:req.body.postId}).then(selectedFileData=>{
       // console.log(selectedFileData);
       BLOGS.deleteOne({_id:req.body.postId}).then((resp)=>{
       
       for(let i=0;i<selectedFileData.images.length;i++)
       {
    const filePath=path.join(__dirname,'..','public/uploads',selectedFileData.images[i].filename)
        fs.unlink(filePath,(err)=>{
    console.log(err);
        })
    }
    res.json({ delete:true})
    })
    .catch(err=>{
        res.json({delete:false,msg:err})
    })
     })
 }
 catch(err){
res.json({delete:false,msg:err})
 }

}
const showView=(req,res)=>{
    try{
        console.log(req.query);
        BLOGS.find({_id:req.query.id})//use find one 
        .populate({
            path:'createdBy',
            select:['name','email']//show only users name and email
        })
        .then(response=>{
            //response[0].createdAt=new Date(response[0].createdAt)
           console.log(response);
           const day=convertISODateToCustomerFormat(response[0].createdAt)
           console.log(day);
           const date=day.slice(0,11)
           const time=day.slice(12,20)
           
          
            res.render('user/detailedview.hbs',{data:response[0],time,date})
        })
        .catch(err=>{
            console.log("error");//design error page, try catch use cheyyuka
        })
           
     }
     catch(err){
    res.send("handled in catch")
     }
}


function convertISODateToCustomerFormat(isoDate){
    const dateObj=new Date(isoDate)
    const day=String(dateObj.getDate()).padStart(2,'0')
    const month=String(dateObj).slice(4,7)
    const year=dateObj.getFullYear()
    const hours=dateObj.getHours()%12||12
    const minutes=String(dateObj.getMinutes()).padStart(2,'0')
    const amOrPm=dateObj.getHours()>=12?'PM':'AM'
    return `${day}-${month}-${year}-${hours}-${minutes}-${amOrPm}`
}


const showUser=(req,res)=>{
    USER.find().then((response)=>{
        res.render('admin/user.hbs',{data:response})
    })
}
const showUserProfile=(req,res)=>{

USER.find({_id:req.query.id}).then((response)=>{

    res.render('admin/userprofile.hbs',{data:response})

    
})
}
module.exports={showAdLogin,uploadPage,doAdLogin,createBlog,adHome,adLogout,deletePost,showView,showPost,showUser,showUserProfile}
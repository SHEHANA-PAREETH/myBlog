const mongoose=require('mongoose')
const ADMIN=require('../models/adminmodel')
const multer=require('multer')
const BLOGS=require('../models/blogschema')
const jwt=require('jsonwebtoken')
const path=require('path')
const fs=require('fs')





const showAdLogin=(req,res)=>{

    if(req.cookies.adminJwt)
    {
        res.redirect('/admin/home')
    }
    else{
        res.render("admin/login.hbs")
        }
        
}

const adHome=(req,res)=>{
    BLOGS.find().then((response)=>{
      res.render('admin/home.hbs',{data:response})
    })
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
        author:req.body.author,
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

module.exports={showAdLogin,uploadPage,doAdLogin,createBlog,adHome,adLogout,deletePost}
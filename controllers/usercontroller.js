
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

USER.findOne({email:req.body.email}).then((response)=>{
   if(response){
    console.log('already');
   
    res.json({user:true})
  console.log('rendered signup');
} 

   
   else
   {
    console.log('new user');
     USER({
    email:req.body.email,
    name:req.body.name,
    mobileno:req.body.mobileno,
    password:req.body.password
}).save().then((resp)=>{
    console.log('written');
    res.json({signup:true})//success res to back end
})    //like promise
.catch(()=>{
    console.log('error');
    res.json({signup:false})

})}
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
 
    res.render('user/home.hbs')
}


const detailedViewPage=(req,res)=>{
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
       const date=day.slice(0,12)
     const time=day.slice(13,21)
      console.log(date,time);
        res.render('user/detailedview.hbs',{data:response[0],date,time})
    })
    .catch(err=>{
        console.log("error");//design error page, try catch use cheyyuka
    })
       
 }
 catch(err){
res.send("handled in catch")
 }
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
res.redirect('/blog')
 })
})
}
const blogView=(req,res)=>{
    BLOGS.find().then((response)=>{
        //get array of objects
       
        res.render('user/blog.hbs',{data:response})
  
  })
    
}
function convertISODateToCustomerFormat(isoDate){
    const dateObj=new Date(isoDate)
    const day=String(dateObj.getDate()).padStart(2,'0')
    const month=String(dateObj).slice(4,8)
    const year=dateObj.getFullYear()
    const hours=dateObj.getHours()%12||12
    const minutes=String(dateObj.getMinutes()).padStart(2,'0')
    const amOrPm=dateObj.getHours()>=12?'PM':'AM'
    return `${day}-${month}-${year}-${hours}-${minutes}-${amOrPm}`
}

const createPassPage=(req,res)=>{
    res.render('user/forgottpass.hbs')
}

const createNewPass=(req,res)=>{
console.log(req.body);
USER.findOneAndUpdate({email:req.body.email,name:req.body.name}, {$set:{password:req.body.pass1}}, {new: true}).then(doc=>{
    if(doc){
        console.log(doc);
        res.json({passwordUpdated:true})
    }
   else
   res.json({passwordUpdated:false})
    
    
})


}

const uploadProfilepic=(req,res)=>{
    const fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/uploads')
        },
        filename:(req,files,cb)=>{
            cb(null,Date.now()+"-"+files.originalname)
        }
    })
    var upload = multer({ storage: fileStorage }).single("profileimage");
    upload(req,res,(err)=>{
        console.log(req.file);
        console.log(req.query);
        USER.findOneAndUpdate({_id:req.query.id},{$set:{profilepic:req.file.filename}},{new:true}).then(doc=>{
            if(doc){
               
                res.redirect('/home')
            }
           
        else
        res.json({profilepicupdated:false})
        })
       
     })
    
}

const showCategory=(req,res)=>{
console.log(req.query);
BLOGS.find({category:req.query.category}).then(doc=>{
    console.log(doc);
    res.render('user/categoryList.hbs',{data:doc})
})
}


const showMyblogs=(req,res)=>{
    console.log(req.query.id);
    BLOGS.find({createdBy:req.query.id}).then((doc)=>{
        console.log(doc);
res.render('user/myblogs.hbs',{data:doc})
    })
}

module.exports={uploadProfilepic,showHomePage,showSignIn,showSignUp,doSignUp,doLogin,detailedViewPage,
    logout,showUpload,uploadPost,blogView,createPassPage,createNewPass,showCategory,showMyblogs}
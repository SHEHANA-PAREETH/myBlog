
const jwt = require('jsonwebtoken')
const getUserData= require('../helpers/userhelper')



const userAuthentication=(req,res,next)=>{

    if(req?.cookies?.userJwt)
{
    
    const isLoggedin=jwt.verify(req.cookies.userJwt,'secretkey')

    if(isLoggedin){
  const user=  parseJwt(req.cookies.userJwt)
  console.log(user);
  getUserData(user.userId).then((response)=>{
    console.log(response);
    res.locals.userDetails=response[0]
    next()
  })
   
}
else{
    res.cookie('userJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1
       })
       res.cookies.userJwt=null
    res.redirect('/signin')
}
}
    else{

    res.redirect('/signin')
   }


}
 
module.exports=userAuthentication


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const jwt = require('jsonwebtoken')
const getAdminData= require('../helpers/adminhelper')



const adminAuthentication=(req,res,next)=>{

    if(req?.cookies?.adminJwt)
{
    
    const isLoggedin=jwt.verify(req.cookies.adminJwt,'adminkey')

    if(isLoggedin){
  const admin=  parseJwt(req.cookies.adminJwt)
  console.log(admin);
  getAdminData(admin.adminId).then((response)=>{
    console.log(response);
    res.locals.adminDetails=response[0]
    next()
  })
   
}
else{
    res.cookie('adminJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1
       })
       res.cookies.adminJwt=null
    res.redirect('/admin')
}
}
    else{

    res.redirect('/admin')
   }


}
 
module.exports=adminAuthentication


function parseJwt (adtoken) {
    var base64Url = adtoken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
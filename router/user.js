const express=require("express")
const router=express.Router()

const {logout,showSignIn,showSignUp,doSignUp,doLogin,showHomePage,detailedViewPage,showUpload,uploadPost,blogView,
    createPassPage,createNewPass,uploadProfilepic,showCategory,showMyblogs,updateName}=require("../controllers/usercontroller")
const userAuth=require('../middleware/userAuth')
 const timemidd=require('../middleware/timemidd')
 



router.get("/signin",showSignUp)
router.get("/",showSignIn)
router.get("/blog",userAuth,timemidd,blogView)
router.get("/uploads",userAuth,showUpload)
router.post("/uploadpost",userAuth,uploadPost)
router.post("/register",doSignUp)
router.post("/login",doLogin)
router.get("/home",userAuth,showHomePage)
router.get("/detailedview",userAuth,detailedViewPage)
router.get("/logout",logout)
router.get("/forgotpassword",createPassPage)
router.post("/createpassword",createNewPass)
router.post("/editprofile",userAuth,uploadProfilepic)
router.get('/category',userAuth,timemidd,showCategory)
router.get('/myblogs',userAuth,showMyblogs)
router.post('/updatename',userAuth,updateName)

module.exports=router
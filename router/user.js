const express=require("express")
const router=express.Router()

const {logout,showSignIn,showSignUp,doSignUp,doLogin,showHomePage,detailedViewPage,showUpload,uploadPost}=require("../controllers/usercontroller")
const userAuth=require('../middleware/userAuth')


router.get("/signin",showSignIn)
router.get("/",showSignUp)
router.get("/uploads",userAuth,showUpload)
router.post("/uploadpost",userAuth,uploadPost)
router.post("/register",doSignUp)
router.post("/login",doLogin)
router.get("/home",userAuth,showHomePage)
router.get("/detailedview",userAuth,detailedViewPage)
router.get("/logout",logout)
module.exports=router
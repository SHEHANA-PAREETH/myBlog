const express=require("express")
const router=express.Router()

const {logout,showSignIn,showSignUp,doSignUp,doLogin,showHomePage,detailedViewPage,showUpload,uploadPost,blogView,
    createPassPage,createNewPass,uploadProfilepic,showCategory,showMyblogs}=require("../controllers/usercontroller")
const userAuth=require('../middleware/userAuth')
 const timemidd=require('../middleware/timemidd')

router.get("/signin",showSignIn)
router.get("/",showSignUp)
router.get("/blog",userAuth,timemidd,blogView)
router.get("/uploads",userAuth,showUpload)
router.post("/uploadpost",userAuth,uploadPost)
router.post("/register",doSignUp)
router.post("/login",doLogin)
router.get("/home",userAuth,showHomePage)
router.get("/detailedview",userAuth,detailedViewPage)
router.get("/logout",logout)
router.get("/forgotpassword",userAuth,createPassPage)
router.post("/createpassword",userAuth,createNewPass)
router.post("/editprofile",userAuth,uploadProfilepic)
router.get('/category',userAuth,showCategory)
router.get('/myblogs',userAuth,showMyblogs)
module.exports=router
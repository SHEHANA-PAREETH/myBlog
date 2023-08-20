const express=require("express")
const router=express.Router()
const {showAdLogin,uploadPage,doAdLogin,createBlog,adHome,adLogout,deletePost,showView,showPost,showUser,showUserProfile}=require('../controllers/admincontroller')
const adminAuth=require('../middleware/adminauth')



router.get("/",showAdLogin)
router.get("/post",adminAuth,showPost)
router.get("/user",adminAuth,showUser)
router.get("/viewuser",adminAuth,showUserProfile)
router.get("/view",adminAuth,showView)
router.get("/home",adminAuth,adHome)
router.get("/uploads",adminAuth,uploadPage)
router.post('/adregister',doAdLogin)
router.post('/createBlog',adminAuth,createBlog)
router.delete('/deletepost',deletePost)

router.get("/logout",adLogout)

module.exports=router
const convertISODateToCustomerFormat=require('../helpers/time')
const BLOGS=require('../models/blogschema')

const timemidd=(req,res,next)=>{
  
    BLOGS.findOne({}, {}, { sort: { 'createdAt' : -1 }})
    .then((resp)=>{
      
      const day=convertISODateToCustomerFormat(resp.createdAt)
      const date=day.slice(0,12)
      const time=day.slice(13,21)
      console.log(date,time)
      BLOGS.updateOne({createdAt:resp.createdAt},{$set:{dateandtime:`${date}: ${time}`}},{new: true}).then(doc=>{
        next()
      })
    })
 
  }
  



 

module.exports=timemidd
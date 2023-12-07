const mongoose=require("mongoose")



const connectDB = async () => {
  try {
     //`mongodb://127.0.0.1:27017/filedatabase`
const conn = await mongoose.connect(process.env.CONNECTION_URL,{
  useNewUrlParser: true,
});
console.log(`mongodb connected`);
  } 
  catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports=connectDB
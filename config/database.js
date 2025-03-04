const mongoose = require("mongoose");
MONGODB_URI = process.env.MONGODB_URI;
const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://wingsrecr:PIfuFbqYiTKC9qIF@cluster0.00tjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

connectDB().then(()=>{
    console.log("Database connected successfully");

}).catch((err)=>{
      console.log(err);
});
module.exports = connectDB;

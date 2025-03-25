const mongoose = require("mongoose");
const multer= require("multer")
const path= require("path")

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", 
    required: true,
  },
  role: {
    type: String,
  },
  image:{
    type:String
  }
});

const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, path.join(__dirname, ".." ,"uploads/hotels"))
  },
  filename:(req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now())
  }
})
hotelSchema.statics.uploadImage= multer({storage:storage}).single("image")  

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;

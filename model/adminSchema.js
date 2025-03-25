const mongoose  =  require("mongoose")
const adminSchema= mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
})
const Admin= mongoose.model("Admin", adminSchema)
module.exports= Admin
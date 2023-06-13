var mongoose = require("mongoose")
var UserSchema = mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String
    
    
})


const User = mongoose.model("users",UserSchema)
module.exports = User;
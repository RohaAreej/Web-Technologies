var mongoose = require("mongoose")
var ContactSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    comment:String
    
})


const Contact = mongoose.model("contact",ContactSchema)
module.exports = Contact;
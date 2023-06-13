var mongoose = require("mongoose")
var MenuSchema = mongoose.Schema({
    name:String,
    price:String

    
    
})


const Menu = mongoose.model("menus",MenuSchema)
module.exports = Menu;
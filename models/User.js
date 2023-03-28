const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    trieddishes:{
        type:Array
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User


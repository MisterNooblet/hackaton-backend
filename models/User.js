import mongoose from "mongoose"

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
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisine'
        }
    ]
      
})

const User = mongoose.model("User", UserSchema)

export default User


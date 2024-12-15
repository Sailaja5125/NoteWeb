import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const UserSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required:true,
    },
    password:{
        type : String,
        required : true
    },
    phonenumber:{
        type :Number,
        required : true,
    },
    
})
// tokens/authentication 

UserSchema.pre("save",async function (next){  // password is hashed
    if(!this.isModified("password")){
     return next(); // next process is continued 
    }
    this.password =await bcrypt.hash(this.password ,10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

// generates the Access token for our website
UserSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id,
        email: this.email,
        // username:this.username,
        password:this.password,
    } , process.env.ACCESS_TOKEN
    )
}

export const UserModel = mongoose.model("User",UserSchema);
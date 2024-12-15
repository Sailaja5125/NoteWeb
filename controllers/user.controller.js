import { UserModel } from "../models/user.models.js";
import { validationResult } from "express-validator";
import asynchandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiresponse.js";

async function generate_Access_token(id){
 try {
    const user = await UserModel.findById(id);
    const access_token =  user.generateToken();
    await user.save()
    return access_token
 }
 catch(err){
    throw new ApiError(500 , "internal server error");
 }
}

const register = asynchandler(async(req , res)=>{
    const {username , email , password ,phonenumber} = req.body;

    const result = validationResult(req);
    if(!result.isEmpty()){
     throw new ApiError(400 , "validation error");
    }
    const existuser = await UserModel.findOne({
        $or : [{email},{username}]
    })
    if(existuser){
        throw new ApiError(409 , "user exists so continue to login");
    }

    const User = await UserModel.create({
        username : username,
        email : email ,
        password : password ,
        phonenumber : phonenumber,
    })
 
    const createduser = await UserModel.findById(User._id).select("-password")
    if(!createduser){
      throw new ApiError(400 , "Something went wrong while signing up")
    }
    res.status(200).json(new ApiResponse(200 , createduser ,"User is signed up"))
})

// login user
const login = asynchandler(async(req,res)=>{
    const {email , password} = req.body
    const log_user = await UserModel.findOne({email})
    if(!log_user){
        throw new ApiError(404 ,"User not registered")
    }

    const valid_password = await log_user.isPasswordCorrect(password)

    if(!valid_password){
        throw new ApiError(401, "invalid credentials");
    }

    const access_token  = await generate_Access_token(
        log_user._id
    );

    const login_user = await UserModel.findOne(log_user._id).select("-password")

    if(!login_user){
        throw new ApiError(404 ,"User not registered")
    }
    return res.status(200).json(new ApiResponse(
        200,
        {
          user: log_user,
          access_token,
        },
        "User logged in successfully"
      ))
})

const details = asynchandler(async(req,res)=>{
    const user = await UserModel.findById(req.User._id).select("-password")
    if(!user){
    throw new ApiError(404,"User is logged out")
    }
    res.status(200).json(new ApiResponse(200,req.User,"User details"))
})

export  {register , login , details}
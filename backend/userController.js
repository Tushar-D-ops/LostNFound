import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"
import UserModel from "./models/userModel.js"
import {errorHandler} from "./utilities.js"

const creatToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}
export const handleUserLogin = async (req,res,next) => {
   const {email,password}=req.body

   try{
    if (!email) {
      return next(errorHandler(400,"Email is required"));
      }
      if(!validator.isEmail(email)){
      return next(errorHandler(400,"Enter Valid Email"));
    }
  
      if (!password) {
      return next(errorHandler(400,"Password is required"));
      }
    const existingUser=await UserModel.findOne({email:email})
    if(!existingUser){
        return next(errorHandler(400,"Invalid Credentials"));
      }
      const isPasswordCorrect= await bcryptjs.compare(password,existingUser.password)
      if(!isPasswordCorrect){
        return next(errorHandler(400,"Invalid Credentials"));
      }

      return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:existingUser,
        token:creatToken(existingUser._id),
      })
   }
   catch(err){
       next(err)
   }


};

export const handleUserRegister=async(req,res,next)=>{
       
      
   const { username, email, password } = req.body
  try {
  if (!username || username.length < 3) {
    return next(errorHandler(400,"Username is required or too short"));
    }

    if (!email) {
    return next(errorHandler(400,"Email is required"));
    }

    if (!password) {
    return next(errorHandler(400,"Password is required"));
    }
    if(!validator.isEmail(email)){
      return next(errorHandler(400,"Invalid Email"));
    }
  
    const existingEmail = await UserModel.findOne({ email })
    if (existingEmail) {
      return next(errorHandler(400,"User already exist with this email"));
    }
    
    
    
      
    const hashedPassword = await bcryptjs.hash(password, 10)
    
    const newUser = new UserModel({
         username:username,
         email:email,
        password: hashedPassword,
    });
    await newUser.save()

    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data:newUser,
        token:creatToken(newUser._id),
    })

  }
  
  catch (error) {
    next(error)
  }



}
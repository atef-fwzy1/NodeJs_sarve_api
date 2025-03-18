
const users = require("../model/users.model")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")
const generate_token = require("../utils/generate_token")



//! get all userse  
const getAllUsers = async (req,res)=>{

         const limit = req.query.limit || 10;
          const page = req.query.page || 1;
          const skip = (page - 1 ) * limit;
            //      .find({get from data only yhis data },{"not come wiht data " = fales})
            //       .find({},{"name" = fales})   هيرجع كل الداتا , ما عد الأسم 
        const data  = await users.find({},{"__v":false},{"password":false}).limit(limit).skip(skip);
        res.status(200).json({status:"success",data:{users:data}})
        res.end();
}

//! register (create a new user)

const register = async (req,res)=>{
      const amigeName = req.file.filename || ""
     const errorsBody = validationResult(req);
     if(errorsBody.errors.length >=1 )
       return  res.status(404).json(errorsBody.errors[0])
         const {password,firstName,lastName,email,role}= req.body;
    //!  password hashing 
    //?   bcrypt.hash(password,string will be conct with password , pest range 8 >= 10)
    const hashing_password = await bcrypt.hash(password,10)
    const newuser = new users({firstName,lastName,email,password:hashing_password,role})
    try{

        // ? generate (jwt) token
       const token = await generate_token({email:newuser.email,id:newuser._id})
        newuser.token = token
        if(avatarName !== "")
       newuser.avatar =  amigeName
        await newuser.save();
        res.status(200).json({status:"success",data:{courses:newuser}})
    }
        catch(errr){
         return   res.status(404).json({status:"filed",message:errr.message})
        }
}

//! login (login with exist user)
const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email && !password)
        return res.status(401).json({status:"filed",message:"Email and password are required"})
    const user = await users.findOne({"email":email})
    try{
        const plianePassword =  await  bcrypt.compare(password,user.password) 

         if(!plianePassword  ){
             return res.status(401).json({status:"filed",message:"Invalid email or passwordddd."})
         }
        }catch(err){
        return res.status(401).json({status:"filed",message:"Invalid email or password."})
        }
        const token = await generate_token({email:email,id:user._id})
        user.token = token

        return res.status(200).json({status:"successful",message:"Login successful!",token:user.token})
 
     
}      

//! delete (delete user from system)
const logout = async(req,res)=>{
    const id = req.params.id 
    try{
        const user =  await users.deleteOne({"_id":id})
        res.status(200).json({status:"user deleted ",data:{user:user}})
    }catch(err){
            res.status(401).json({status:"filed ",data:{user:"Invalid ID format. Please enter a valid ID"}})
    }
}




module.exports = {
    getAllUsers,
    register,
    login,
    logout
}
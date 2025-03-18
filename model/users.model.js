const mongoose = require("mongoose")
const validator = require("validator");



  const users_schema = new mongoose.Schema({
       firstName:{
          type:String,
          required:true
       },
       lastName:{
          type:String,
          required:true
       },
       email:{
          type:String,
          require:[true,"Email is required. Please enter a valid Email"],
          unique:[true,"This email is already registered. Please use a different email or log in to your account"],
          validate:[validator.isEmail ,"Invalid email format. Please enter a valid email address"]
     },
        password:{
               type:String,
               required:true,
               validate:[validator.isStrongPassword,"Password is too weak. It must be at least 8 characters long and include letters and numbers"]
        
       },
       token:{
         type:String,
       },
       role:{
         type:String,
         enum:["ADMIN","MANGER","USER"],
         default:"USER"

       },
       avatar:{
         type:String,
         default:"Uploads/profile.jpg"
       }
  })

  module.exports = mongoose.model("users",users_schema);


const mongoose = require("mongoose")

 

  const courses_schema = new mongoose.Schema({
       title:{
        type:String,
        required:true
       },
       price:{
        type:Number,
        required:true
       }
  })

  module.exports = mongoose.model("course",courses_schema);
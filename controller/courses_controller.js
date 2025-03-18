const {validationResult} = require("express-validator")
const courses = require("../model/courses.model");
const { reconstructFieldPath } = require("express-validator/lib/field-selection");


const GetAllCourses = async (req,res)=>{
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      const skip = (page - 1 ) * limit;
        //      .find({get from data only yhis data },{"not come wiht data " = fales})
        //       .find({},{"name" = fales})   هيرجع كل الداتا , ما عد الأسم 
    const data  = await courses.find({},{"__v":false}).limit(limit).skip(skip);
    res.status(200).json({status:"success",data:{courses:data}})
    res.end();
}


const GetSingleCourses = async  (req,res)=>{
    const id  = req.params.id
    try{
        const  reqcourse = await courses.findById(id)
        if(!reqcourse)
            return res.status(404).json({status:"not found"})
        res.status(200).json({status:"success",data:{course:reqcourse}})
    }catch(err){
         return res.status(404).json({status:"filed requerst , id not valid ",data:null})
    }

}

const CreateNewCourse =async  (req,res)=>{
     

     const errorsBody = validationResult(req);

     if(errorsBody.errors.length >=1 )
       return  res.status(404).json(errorsBody.errors[0])

     const newCourse = new courses(req.body)
      await newCourse.save();
     res.status(200).json({status:"success",data:{courses:newCourse}})
       
}

const UpdateCourse = async (req,res)=>{
 
     const errorsBody = validationResult(req);
      const id = req.params.id;
     if(errorsBody.errors.length >=1 )
       return  res.status(404).json(errorsBody.errors[0])

        const updateCourse = await courses.findByIdAndUpdate(id,{$set:{...req.body}})
        res.status(200).json(updateCourse)
       
}

const DeleteCourse = async  (req,res)=>{
    const id = req.params.id 
     const newData = await  courses.deleteOne({"_id":id})
     if(newData.deletedCount === 0)
              return  res.status(403).json({status:"filed ",data:{message:"There is no course who owns this ID"}})
     res.status(200).json({status:"success ",data:{message:"The course was remove  "}})

}


module.exports = {
    DeleteCourse,
    UpdateCourse,
    CreateNewCourse,
    GetSingleCourses,
    GetAllCourses

}

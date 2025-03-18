const express = require("express")
const { DeleteCourse, UpdateCourse, CreateNewCourse,GetSingleCourses, GetAllCourses} = require("../controller/courses_controller")
const {body} = require("express-validator")
const router_courses = express();
const  verifyToken = require("../middleware/verifyToken")
const AllowedTo = require("../middleware/AllowdToDelete")

//   get all courses
//  create a new course 
router_courses.route("/")
        .get(GetAllCourses)
        .post(verifyToken,body("title").notEmpty().withMessage("title is require").isLength({min:2}).withMessage("length of title must be more than 2 char"),body("price").notEmpty().withMessage("price is require , must be number"),CreateNewCourse)

        
//  get single course 
//  upadte  course 
// delete course 
router_courses.route("/:id")
        .get(GetSingleCourses)
        .patch(body("title").notEmpty().withMessage("title is require").isLength({min:2}).withMessage("length of title must be more than 2 char"),body("price").notEmpty().withMessage("price is require , must be number"),UpdateCourse)
        .delete(verifyToken,AllowedTo,DeleteCourse)


module.exports = router_courses



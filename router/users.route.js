const express = require("express")
const {body} = require("express-validator")
const {getAllUsers,register,login,logout} =require("../controller/users_controller")
const router_users = express();
const verifyToken = require("../middleware/verifyToken")
const multer = require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads')
  },
  filename: function (req, file, cb) {
    const uniqueImageNAMe = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueImageNAMe+"."+file.mimetype.split("/")[1])

  }
})
const File_filter =(req, file, cb)=>{
const typeFile = file.mimetype.split("/")[0];

if(typeFile === "image")
       return cb(null,true)
return cb("file moust be an image",false)

}
const uplaod = multer({ storage: storage ,fileFilter:File_filter})

//   get all users
//  create a new course 
router_users.route("/").get(verifyToken,getAllUsers)
router_users.route("/register")
.post(uplaod.single("avatar"),body("firstName").notEmpty().withMessage("firstname is require").isLength({min:3}).withMessage("length of fristName must be more than 3char"),body("email").notEmpty().withMessage("email is require , must be email"),register)
router_users.route("/login")
        .post(body("email").notEmpty().withMessage("email is require , must be email"),body("password").notEmpty().isLength({min:5}).withMessage("pass is require , pass  mut be more than 8 chars and content numbers and chars !"),login)
router_users.route("/:id").delete(logout)

        


module.exports = router_users



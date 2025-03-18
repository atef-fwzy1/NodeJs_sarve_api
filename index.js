const mongoose =  require('mongoose');
const  express = require("express") 
const path = require("path")
const cors = require('cors');
const router_courses = require('./router/courses.route')
const router_users = require("./router/users.route")
require("dotenv").config()
const uri =process.env.MONGO_DB_URL;
const app = express();
console.log("loading.... ")
mongoose.connect(uri).then(()=>{
     console.log("MongoDB server started ✅")
}).catch((err)=>{
  console.log("conection field  ⛔")
})
app.use(express.json())
app.use(cors());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/api/courses",router_courses);
app.use("/api/users",router_users);

app.all("*",(req,res)=>{
    res.status(404).send({status:"file",data:"not valid URL ? "})
});

app.listen(+process.env.PORTNnumber || 5000,()=>{
    console.log("lisend on port 5000")
})


const users = require("../model/users.model")

const ALlowedTo =async  (req,res,next)=>{
      const authHeader = req.headers.authorization || req.headers.Authorization || ""
      if(!authHeader)
        return  res.status(401).json({status:"filed",code:401,message:"Unauthorized - token is required!"})
      const token = authHeader.split(' ')[1];
     const user = await users.findOne({"token":token}) 
    if(user.role === "MANGER"|| user.role ==="ADMIN")
      return  next();

       return  res.status(401).json({status:"filed",code:401,message:"Sorry, you do not have permission to delete this item as you are not a manager or an administrator"})
}

module.exports = ALlowedTo
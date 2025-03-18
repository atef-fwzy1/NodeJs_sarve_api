const jwt = require("jsonwebtoken")
const verifyToken = (req,res,next)=>{
      const authHeader = req.headers.Authorization || req.headers.authorization || ""
      if(!authHeader)
        return  res.status(401).json({status:"filed",code:401,message:"Unauthorized - token is required!"})
      const token = authHeader.split(' ')[1];
       
      try{
        jwt.verify(token,process.env.JWT_SECRET_KEY)
          next();
        }catch(error){
            return res.status(401).json({status:"filed",code:401,message:"Unauthorized - Check your token!"})
           }
}

module.exports = verifyToken;
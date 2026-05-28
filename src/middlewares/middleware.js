const jwt = require("jsonwebtoken")

exports.verifyToken = async (req,res,next) => {
    //verify token 
    let authHeader = req.headers.authorization
    
    // Check query parameter if header is not provided
    if(!authHeader && req.query.authorization){
        authHeader = req.query.authorization
    }
    
    if(authHeader){
        const accesstoken = authHeader.split(" ")[1];
        jwt.verify(accesstoken,process.env.JWT_ACCESS_KEY,(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You're not authenticated")
    }
}
exports.verifyUserOrAdmin = async (req,res,next) => {
    let authHeader = req.headers.authorization
    
    // Check query parameter if header is not provided
    if(!authHeader && req.query.authorization){
        authHeader = req.query.authorization
    }
    
    if(!authHeader){
        return res.status(401).json("You're not authenticated")
    }
    
    const accesstoken = authHeader.split(" ")[1];
    jwt.verify(accesstoken,process.env.JWT_ACCESS_KEY,(err,user)=>{
        if(err){
            return res.status(403).json("Token is not valid")
        }
        req.user = user;
        if(req.user.id == req.params.id || req.user.isadmin){
            next()
        }else {
            return res.status(403).json({
                message : "You're not allowed to delete others"
            })
        }
    })
}

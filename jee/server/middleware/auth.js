const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) =>{
    try{
        const token =  req.cookies.cooltokens || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token || token === undefined){
            return res.status(401).json({
                success:false,
                message: 'token not found'
            });
        }

        // verify the token

        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message: 'invalid token'
            });
        }

        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message: 'something went wrong while verifying token'
        });
    }
}


exports.isUser = (req, res, next) =>{
    try{
        if(req.user.role !== "User"){
            return res.status(401).json({
                success:false,
                message:"this route is protected for students"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}



exports.isAdmin = (req, res, next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this route is protected for admin"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}
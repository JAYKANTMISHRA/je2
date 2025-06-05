const bcrypt = require('bcrypt');
const User = require("../models/signupModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async(req, res) => {
    try{
        // extract data 
        const {name, email, password, role} = req.body;
        // check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing"
            });
        }

        // create new user
        const user = await User.create({
            name, email, password:hashedPassword, role
        })
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {
            expiresIn:"2h",
        });

        user.token=token;
        user.password=undefined;
        const options = {
            expires: new Date( Date.now() + 1000),
            httpOnly:true
        }

        res.cookie("cooltokens", token, options).status(200).json({
            success:true,
            token,
            user,
            message:'user signed up successfully'
        });
        // return res.status(200).json({
        //     success:true,
        //     message:'User created successfully'
        // });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            meassage:"user can not be registered..please try later"
        })
    }
}


exports.login = async(req, res) => {
    try{
        // data fetch
        const {email, password} = req.body;
        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'please fill all the details carefully'
            });
        }
        // check for registered user
        const user = await User.findOne({email});
        // if user is not registered
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user is not registered'
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        };
        // verify password and generate JWT token
        if(await bcrypt.compare(password, user.password) ){
            // password matched
            const token = jwt.sign(payload, 
                process.env.JWT_SECRET, 
                {
                expiresIn:"2h",
                });


            // user = user.toObject();
            user.token=token;
            user.password=undefined;
            const options = {
                expires: new Date( Date.now() + 1000),
                httpOnly:true
            }

            res.cookie("cooltokens", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'user logged in successfully'
            });                         
        }
        else {
            // password not matched
            return res.status(403).json({
                success:false,
                message:'incorrect password'
            });
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            meassage:"login failure...try again later"
        })
    }
}
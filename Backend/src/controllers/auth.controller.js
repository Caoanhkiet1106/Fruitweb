const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const RefreshToken = require("../models/RefreshToken.model")
const jwt = require('jsonwebtoken');
const { genarateAccessToken,genarateRefreshToken } = require('../utils/jwt');


// register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        // is email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        // creat new user
        
        const newUser = new User({ username, email, password: hashedpassword, phone });
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        if(user && isMatch){
            const accesstoken = genarateAccessToken(user)
            const refreshToken = genarateRefreshToken(user)
            await RefreshToken.create({
                user:user._id,
                token:refreshToken,
            })
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict"
            })
            const {password, ...others} = user._doc
            res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: others , 
            token : {
                accesstoken 
            }
        });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Refresh token 

exports.reqRefreshtoken = async (req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                message:"You're not authenticated"
            }) 
        }
        const storedToken = await RefreshToken.findOne({
            token:refreshToken
        })
        if(!storedToken){
            return res.status(403).json({
                messeage:"invalid refresh token"
            })
        }
        let decoded

        try {
          decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY)  
        } catch (error) {
            await RefreshToken.findOneAndDelete({
                token:refreshToken,
            })
            res.clearCookie("refreshToken")
            return res.status(403).json({
                message:"token is invalid"
            })
        }
        //delete old RT token
        await RefreshToken.findOneAndDelete({
            token:refreshToken
        })
        //create AT and RT token new 
        const newAccesstoken = genarateAccessToken(decoded);
        const newRefreshtoken = genarateRefreshToken(decoded);
        await RefreshToken.create({
            user:decoded.id,
            token:newRefreshtoken
        })
        //update cookie
        res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict"
            })
        return res.status(200).json({
            accesstoken:newAccesstoken
        })
        
    } catch (error) {
        return res.status(500).json({
            messeage:error.message
        })
    }
    
}

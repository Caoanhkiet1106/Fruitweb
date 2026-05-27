const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
            const Accesstoken = jwt.sign({
                id: user.id,
                admin: user.isadmin
            },process.env.JWT_ACCESS_KEY,
            {
                expiresIn : "1d"
            });

            const {password, ...others} = user._doc
            res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: others , Accesstoken
        });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


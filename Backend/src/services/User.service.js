const User = require('../models/User.model');
const bcrypt = require('bcrypt');
// Register a new user
exports.registerUser = async (userData) => {
        const { username, email, password, phone } = userData;
        // check email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        // creat new user
        const newUser = new User({ username, email, password: hashedpassword, phone });

        return newUser.save();
}

//Login user
exports.LoginUser = async (email, password) => {
    const user = await User.findOne({ email: email });
    if(!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Invalid password');
    }
    return user;
}
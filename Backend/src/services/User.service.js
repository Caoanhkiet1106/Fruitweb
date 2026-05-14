const User = require('../models/User.model');
const bcrypt = require('bcrypt');
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
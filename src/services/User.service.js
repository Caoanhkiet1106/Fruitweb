const User = require('../models/User.model');

exports.registerUser = async (userData) => {
        const { username, email, password, phone } = userData;
        // check email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        // creat new user
        const newUser = new User({ username, email, password, phone });

        await newUser.                                                                                                                                            save();
        return newUser;
}
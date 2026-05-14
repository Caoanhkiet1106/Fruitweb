const userService = require('../services/User.service');
exports.registerUser = async (req, res) => {
    // console.log('Register called with body:', req.body);
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
}
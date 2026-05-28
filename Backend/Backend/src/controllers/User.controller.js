const User = require('../models/User.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
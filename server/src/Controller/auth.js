const jwt = require('jsonwebtoken');
const { User } = require('../Model/user_model');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.User._id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        req.user = user; // Add user to request object
        next(); // Continue to the next middleware/route
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { authenticateToken };
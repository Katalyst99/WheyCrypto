// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
	// Log the incoming data
	console.log('Register data:', req.body);

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({ username, email, password_hash });

        // Generate token
        const token = jwt.sign({ user_id: newUser.user_id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

const login = async (req, res) => {
    try {
	console.log('Login Response:', res);
        const { email, password } = req.body;

        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate token
        const token = jwt.sign({ user_id: user.user_id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

        res.status(200).json({ token, user: { user_id: user.user_id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    register,
    login
};

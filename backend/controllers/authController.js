const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Register attempt:', { username, email });

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log('Registration failed: Email already in use');
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({ username, email, password_hash });
    console.log('New user created:', newUser);

    // Generate token
    const token = jwt.sign({ user_id: newUser.user_id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    console.log('Registration successful');
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log('Login failed: Password mismatch');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate token
    const token = jwt.sign({ user_id: user.user_id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    console.log('Login successful');
    res.status(200).json({ token, user: { user_id: user.user_id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  register,
  login
};

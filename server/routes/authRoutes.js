const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegister, validateLogin } = require('../utils/authUtils');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user input
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate user input
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create and sign JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
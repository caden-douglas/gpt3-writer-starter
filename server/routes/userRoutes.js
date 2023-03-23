const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../utils/authUtils');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
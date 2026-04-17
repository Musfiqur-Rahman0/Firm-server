const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

console.log('✅ Auth routes loaded');

router.get('/test', (req, res) => {
  res.send('Auth route working');
});
// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router;
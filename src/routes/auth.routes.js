const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth');

console.log('✅ Auth routes loaded');

router.get('/test', (req, res) => {
  res.send('Auth route working');
});
// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

router.get('/me', authenticate, authController.getMe);

module.exports = router;
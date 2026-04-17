const express  = require('express');
const router = express.Router();

const userController= require("../controllers/user.controller");

console.log('✅ User routes loaded');
router.get('/test', (req, res) => {
  res.send('User route working');
});
// Get all users
router.get('/', userController.getAllUsers);    
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

// (later you will add auth middleware here)

console.log(' Admin routes loaded');

// Users
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/status', adminController.updateUserStatus);

// Vendors
router.put('/vendors/:id/status', adminController.updateVendorStatus);

// Certifications
router.put('/certifications/:id/status', adminController.updateCertificationStatus);

// Produce moderation
router.put('/produce/:id/toggle', adminController.toggleProduce);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

module.exports = router;
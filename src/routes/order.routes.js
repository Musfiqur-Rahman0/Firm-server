const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

// Create order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get single order
router.get('/:id', orderController.getOrder);

// User orders
router.get('/user/:userId', orderController.getUserOrders);

// Vendor orders
router.get('/vendor/:vendorId', orderController.getVendorOrders);

// Update status
router.put('/:id/status', orderController.updateOrderStatus);

// Delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
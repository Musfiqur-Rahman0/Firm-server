const express = require('express'); 
const router = express.Router();

const vendorController = require('../controllers/vendor.controller');
console.log('✅ Vendor routes loaded');


router.get("/", vendorController.getVendors);
router.get("/:id", vendorController.getVendor);
router.post("/", vendorController.createVendorProfile);
router.put("/:id", vendorController.updateVendor);
router.delete("/:id", vendorController.deleteVendor);

module.exports = router;
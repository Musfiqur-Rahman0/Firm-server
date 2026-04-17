const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rental.controller");

router.post("/space", rentalController.createRentalSpace);
router.get("/space", rentalController.getRentalSpaces);
router.get("/space/:id", rentalController.getRentalSpace);
router.put("/space/:id", rentalController.updateRentalSpace);
router.delete("/space/:id", rentalController.deleteRentalSpace);

router.post("/booking", rentalController.createBookings);
router.get("/booking", rentalController.getBookings);
router.put("/booking/:id/cancel", rentalController.cancelBooking);

module.exports = router;

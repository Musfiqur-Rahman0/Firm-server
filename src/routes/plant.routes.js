const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plant.controller');

console.log(' Plant routes loaded');

// Plant tracking
router.post('/', plantController.createPlantTracking);
router.get('/', plantController.getAllPlants);
router.get('/:id', plantController.getPlant);
router.put('/:id', plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);
router.post('/update', plantController.addPlantUpdate);

module.exports = router;
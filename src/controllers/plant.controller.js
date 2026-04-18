const prisma = require('../config/prisma');

exports.createPlantTracking = async (req, res) => {
  try {
    const {
      userId,
      produceId,
      plantName,
      currentStage,
      healthStatus,
      notes,
      expectedHarvestDate
    } = req.body;

    const plant = await prisma.plantTracking.create({
      data: {
        userId,
        produceId,
        plantName,
        currentStage,
        healthStatus,
        notes,
        expectedHarvestDate: expectedHarvestDate ? new Date(expectedHarvestDate) : null
      }
    });

    res.status(201).json({
      success: true,
      message: "Plant tracking created",
      data: plant
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllPlants = async (req, res) => {
  try {
    const plants = await prisma.plantTracking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        produce: true,
        updates: true
      }
    });

    res.json({
      success: true,
      data: plants
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPlant = async (req, res) => {
  try {
    const plant = await prisma.plantTracking.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        produce: true,
        updates: true
      }
    });

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: "Plant not found"
      });
    }

    res.json({
      success: true,
      data: plant
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const updated = await prisma.plantTracking.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json({
      success: true,
      message: "Plant updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addPlantUpdate = async (req, res) => {
  try {
    const {
      plantTrackingId,
      stage,
      healthStatus,
      note
    } = req.body;

    const update = await prisma.plantUpdate.create({
      data: {
        plantTrackingId,
        stage,
        healthStatus,
        note
      }
    });

    res.status(201).json({
      success: true,
      message: "Plant update added",
      data: update
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    await prisma.plantTracking.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: "Plant deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
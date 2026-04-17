const prisma = require("../config/prisma");

exports.createProduce = async (req, res) => {
  try {
    const {
      vendorId,
      name,
      description,
      price,
      category,
      availableQuantity,
      imageUrl,
    } = req.body;

    const produce = await prisma.produce.create({
      data: {
        vendorId,
        name,
        description,
        price,
        category,
        availableQuantity,
        imageUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: "Produce created successfully",
      data: produce,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProduce = async (req, res) => {
  try {
    const produce = await prisma.produce.findMany({
      where: {
        isActive: true,
      },
      include: {
        vendor: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      data: produce,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProduce = async (req, res) => {
  try {
    const item = await prisma.produce.findUnique({
      where: { id: req.params.id },
      include: {
        vendor: true,
      },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Produce not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduce = async (req, res) => {
  try {
    const updated = await prisma.produce.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Produce updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduce = async (req, res) => {
  try {
    await prisma.produce.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: "Produce deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

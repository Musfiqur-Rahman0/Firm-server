const prisma = require('../config/prisma');

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      produceId,
      quantity,
      notes
    } = req.body;

    // Get produce details
    const produce = await prisma.produce.findUnique({
      where: { id: produceId }
    });

    if (!produce) {
      return res.status(404).json({
        success: false,
        message: "Produce not found"
      });
    }

    // Calculate total price
    const totalPrice = parseFloat(produce.price) * quantity;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        produceId,
        vendorId: produce.vendorId,
        quantity,
        totalPrice,
        notes
      }
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        produce: true,
        vendor: true
      }
    });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        produce: true,
        vendor: true
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.params.userId
      },
      include: {
        produce: true,
        vendor: true
      }
    });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        vendorId: req.params.vendorId
      },
      include: {
        user: true,
        produce: true
      }
    });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json({
      success: true,
      message: "Order status updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await prisma.order.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: "Order deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


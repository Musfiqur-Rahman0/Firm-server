const prisma = require("../config/prisma");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json({
      success: true,
      message: `User ${status.toLowerCase()}`,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateVendorStatus = async (req, res) => {
  try {
    const { certificationStatus } = req.body;

    const updated = await prisma.vendorProfile.update({
      where: { id: req.params.id },
      data: { certificationStatus }
    });

    res.json({
      success: true,
      message: `Vendor ${certificationStatus.toLowerCase()}`,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCertificationStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const updated = await prisma.sustainabilityCert.update({
      where: { id: req.params.id },
      data: {
        status,
        adminNote
      }
    });

    res.json({
      success: true,
      message: `Certification ${status.toLowerCase()}`,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.toggleProduce = async (req, res) => {
  try {
    const { isActive } = req.body;

    const updated = await prisma.produce.update({
      where: { id: req.params.id },
      data: { isActive },
    });

    res.json({
      success: true,
      message: `Produce ${isActive ? "activated" : "deactivated"}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [users, vendors, produce, orders] = await Promise.all([
      prisma.user.count(),
      prisma.vendorProfile.count(),
      prisma.produce.count(),
      prisma.order.count(),
    ]);
    res.json({
      success: true,
      data: {
        totalUsers: users,
        totalVendors: vendors,
        totalProduce: produce,
        totalOrders: orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

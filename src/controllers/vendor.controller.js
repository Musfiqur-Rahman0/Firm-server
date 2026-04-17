const {
  user,
  produce,
  rentalSpace,
  sustainabilityCert,
} = require("../config/prisma");
const prisma = require("../config/prisma");

exports.createVendorProfile = async (req, res) => {
  try {
    const { userId, farmName, farmLocation, farmDescription } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if vendor already exists
    const existingVendor = await prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "Vendor profile already exists",
      });
    }

    // Create vendor profile
    const vendor = await prisma.vendorProfile.create({
      data: {
        userId,
        farmName,
        farmLocation,
        farmDescription,
      },
    });

    res.status(201).json({
      success: true,
      message: "Vendor profile created successfully",
      data: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await prisma.vendorProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        produce: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
        rentalSpaces: {
          select: {
            id: true,
            location: true,
            pricePerDay: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const vendor = await prisma.vendorProfile.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        produce: true,
        rentalSpaces: true,
        sustainabilityCerts: true,
        orders: true,
      },
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateVendorProfile = async (req, res) => {
  try {
    const updatedVendor = await prisma.vendorProfile.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json({
      success: true,
      message: "Vendor profile updated",
      data: updatedVendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteVendorProfile = async (req, res) => {
  try {
    const deletedVendor = await prisma.vendorProfile.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "Vendor profile deleted",
      data: deletedVendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVendorProfile: exports.createVendorProfile,
  getVendors: exports.getVendors,
  getVendor: exports.getVendor,
  updateVendor: exports.updateVendorProfile,
  deleteVendor: exports.deleteVendorProfile,
};

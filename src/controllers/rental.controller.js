const {
  vendorProfile,
  rentalBooking,
  rentalSpace,
  user,
} = require("../config/prisma");
const prisma = require("../config/prisma");

exports.createRentalSpace = async (req, res) => {
  try {
    const {
      vendorId,
      location,
      pricePerDay,
      description,
      imageUrl,
      amenities,
      size,
    } = req.body;

    const space = await prisma.rentalSpace.create({
      data: {
        vendorId,
        location,
        pricePerDay,
        description,
        imageUrl,
        amenities: amenities || [],
        size,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Rental created", data: space });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRentalSpaces = async (req, res) => {
  try {
    const spaces = await prisma.rentalSpace.findMany({});

    res.json({ success: true, message: "All rentals", data: spaces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRentalSpace = async (req, res) => {
  try {
    const space = await prisma.rentalSpace.findUnique({
      where: { id: req.params.id },
    });

    if (!space) {
      return res.status(404).json({ error: "Rental space not found" });
    }

    res.json({ success: true, message: "Rental space found", data: space });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRentalSpace = async (req, res) => {
  try {
    const updated = await prisma.rentalSpace.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Rental space updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRentalSpace = async (req, res) => {
  try {
    await prisma.rentalSpace.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: "Rental space deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createBookings = async (req, res) => {
  try {
    const { rentalSpaceId, userId, startDate, totalPrice, endDate } = req.body;
    const booking = await prisma.rentalBooking.create({
      data: {
        rentalSpaceId,
        userId,
        startDate: new Date(startDate),
        endData: new Date(endDate),
        totalPrice,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await prisma.rentalBooking.findMany({
      rentalSpace: true,
      user: true,
    });

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {}
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await prisma.rentalBooking.update({
      where: { id: req?.params?.id },
      data: { status: "CANCELLED" },
    });

    res.json({
      success: true,
      message: "Booking canclled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

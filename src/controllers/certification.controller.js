const prisma = require("../config/prisma");

exports.createCertification = async (req, res) => {
  try {
    const {
      vendorId,
      certifyingAgency,
      certificationDate,
      expiryDate,
      documentUrl,
    } = req.body;

    const cert = await prisma.sustainabilityCert.create({
      data: {
        vendorId,
        certifyingAgency,
        certificationDate: new Date(certificationDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        documentUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: "Certification submitted successfully",
      data: cert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.getCertifications = async (req, res) => {
  try {
    const certs = await prisma.sustainabilityCert.findMany({
      include: {
        vendor: {
          select: {
            id: true,
            farmName: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: certs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const updated = await prisma.sustainabilityCert.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Certification updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    await prisma.sustainabilityCert.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: "Certification deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

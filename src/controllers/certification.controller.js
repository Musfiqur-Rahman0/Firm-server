exports.applyCertification = async (req, res) => {
  try {
    res.status(201).json({ message: "Certification applied" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCertifications = async (req, res) => {
  try {
    res.json({ message: "All certifications" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
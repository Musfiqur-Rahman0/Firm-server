exports.createRental = async (req, res) => {
  try {
    res.status(201).json({ message: "Rental created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRentals = async (req, res) => {
  try {
    res.json({ message: "All rentals" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
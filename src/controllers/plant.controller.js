exports.addPlant = async (req, res) => {
  try {
    res.status(201).json({ message: "Plant added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlants = async (req, res) => {
  try {
    res.json({ message: "All plants" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
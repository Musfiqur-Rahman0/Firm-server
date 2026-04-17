exports.addProduce = async (req, res) => {
  try {
    res.status(201).json({ message: "Produce added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProduce = async (req, res) => {
  try {
    res.json({ message: "All produce" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
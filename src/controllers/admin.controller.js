exports.dashboard = async (req, res) => {
  try {
    res.json({ message: "Admin dashboard" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    res.json({ message: "Admin: all users" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
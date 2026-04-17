exports.createOrder = async (req, res) => {
  try {
    res.status(201).json({ message: "Order created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    res.json({ message: "All orders" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
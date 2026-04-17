exports.createPost = async (req, res) => {
  try {
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    res.json({ message: "All posts" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
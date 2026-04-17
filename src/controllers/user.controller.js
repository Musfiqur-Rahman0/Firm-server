const prisma = require('../config/prisma');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {

    const user = await prisma.user.update({
        where: { id: req.params.id },
        data: req.body,
    })

    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
        where: {id : req.params.id},
    })
    res.json({ message: "User deleted", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
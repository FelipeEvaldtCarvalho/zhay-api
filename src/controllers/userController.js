const { generateHash } = require("../services/bcrypt.js");

const User = require("../models/index.js")({
  name: "users",
  tableName: "users",
  selectableProps: ["id", "name", "email", "cpf", "phone"],
});

const UserController = {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const hashedPassword = await generateHash(userData.password_hash);
      userData.password_hash = hashedPassword;
      userData.role = "customer";
      const newUser = await User.create(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error.errno === 1062) {
        return res.status(409).json({ error: "E-mail already registered!" });
      }
      return res.status(500).json({ error: "Internal server error!" });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.find({ id: userId });
      if (!user || user.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      const updatedUser = await User.update(userId, updatedUserData);
      if (!updatedUser || updatedUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.destroy(userId);
      if (!deletedUser || deletedUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;

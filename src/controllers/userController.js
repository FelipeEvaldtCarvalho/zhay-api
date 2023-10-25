const { generateHash } = require("../services/bcrypt.js");

const User = require("../models/user.js");

const UserController = {
  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Internal server error");
    }
  },

  async getUserById(id) {
    try {
      const [user] = await User.find({ id });
      if (!user) {
        return new Error("User not found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  },

  async createUser(args) {
    try {
      const userData = { ...args };
      const hashedPassword = await generateHash(userData.password_hash);
      userData.password_hash = hashedPassword;
      userData.role = "customer";
      return await User.create(userData);
    } catch (error) {
      if (error.errno === 1062) {
        throw new Error("E-mail already registered!");
      }
      throw new Error("Internal server error!");
    }
  },

  async updateUser(args) {
    try {
      const userId = args.id;
      const updatedUserData = { ...args };
      const updatedUser = await User.update(userId, updatedUserData);
      if (!updatedUser) {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteUser(id) {
    try {
      const deletedUser = await User.destroy(id);
      if (!deletedUser || deletedUser.length === 0) {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findUsers(args) {
    try {
      const users = await User.find(args);
      if (!users || !users.length) {
        throw new Error("No user found");
      }
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UserController;

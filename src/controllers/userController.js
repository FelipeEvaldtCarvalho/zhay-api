const { generateHash } = require("../services/bcrypt.js");

const UserRepository = require("../repositories/user.js");

const UserController = {
  async getAllUsers(pagination) {
    return await UserRepository.all(pagination);
  },

  async getUserById(id) {
    return await UserRepository.findById(id);
  },

  async createUser(args) {
    try {
      const userData = { ...args };
      const hashedPassword = await generateHash(userData.password_hash);
      userData.password_hash = hashedPassword;
      userData.role = "customer";
      return await UserRepository.create(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUser(args) {
    try {
      await UserRepository.update(args.id, args);
      return { msg: "Updated!" };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteUser(id) {
    try {
      await UserRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findUsers(args) {
    try {
      return await UserRepository.find(args);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UserController;

const { generateHash, generateUuid } = require("../services/bcrypt.js");
const { sendComfirmEmail } = require("../services/email");

const UserRepository = require("../repositories/user.js");

const UserController = {
  // async getAllUsers(pagination) {
  //   return await UserRepository.all(pagination);
  // },

  async getUserById(id) {
    return await UserRepository.findById(id);
  },

  async createUser(args) {
    try {
      const userData = { ...args };
      const hashedPassword = await generateHash(userData.password_hash);
      userData.password_hash = hashedPassword;
      userData.token = generateUuid();
      const create = await UserRepository.create(userData);
      const [userId] = create;
      const newUser = this.getUserById(userId);
      await sendComfirmEmail(newUser);
      return newUser;
    } catch (error) {
      throw Error(error.message);
    }
  },

  async updateUser(id, args) {
    try {
      const userData = { ...args };
      if (userData.password_hash) {
        const hashedPassword = await generateHash(userData.password_hash);
        userData.password_hash = hashedPassword;
      }
      return await UserRepository.update(id, userData);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // async deleteUser(id) {
  //   try {
  //     await UserRepository.delete(id);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // },

  async findUsers(args) {
    try {
      return await UserRepository.find(args);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UserController;

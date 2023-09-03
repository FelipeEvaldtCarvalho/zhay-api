require("dotenv").config();
const jwt = require("jsonwebtoken");
const { compareStringToHash } = require("../services/bcrypt.js");

const UserController = require("./userController.js");

const AuthController = {
  async login({ email, password_hash }) {
    try {
      if (!password_hash || !email) {
        throw new Error("No Password or Email");
      }
      const [user] = await UserController.findUsers({ email });
      const passwordMatch = await compareStringToHash(
        password_hash,
        user.password_hash
      );
      if (!passwordMatch) {
        throw new Error("Wrong Password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      delete user.password_hash;
      return { user, token };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = AuthController;

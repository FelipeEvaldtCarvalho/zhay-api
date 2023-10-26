require("dotenv").config();
const jwt = require("jsonwebtoken");
const { compareStringToHash } = require("../services/bcrypt.js");
const JWTsecret = process.env.JWT_SECRET;

const UserController = require("./userController.js");

const AuthController = {
  async login({ email, password_hash }) {
    try {
      if (!password_hash || !email) {
        throw new Error(
          JSON.stringify({ msg: "No Password or Email", status: 401 })
        );
      }
      const [user] = await UserController.findUsers({ email });
      const passwordMatch = await compareStringToHash(
        password_hash,
        user.password_hash
      );
      if (!passwordMatch) {
        throw new Error(JSON.stringify({ msg: "Wrong Password", status: 401 }));
      }

      const token = jwt.sign({ userId: user.id }, JWTsecret, {
        expiresIn: "5m",
      });
      delete user.password_hash;
      return { user, token };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = AuthController;

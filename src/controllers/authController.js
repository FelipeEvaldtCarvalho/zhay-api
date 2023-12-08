require("dotenv").config();
const jwt = require("jsonwebtoken");
const { compareStringToHash } = require("../services/bcrypt.js");
const JWTsecret = process.env.JWT_SECRET;

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
        return { error: "Wrong Password", status: 401 };
      }
      const token = jwt.sign({ userId: user.id }, JWTsecret, {
        expiresIn: "5m",
      });
      delete user.password_hash;
      return { data: { user, token }, status: 200 };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async confirmEmail(token) {
    try {
      if (!token) {
        throw Error("No token passed");
      }
      const [user] = await UserController.findUsers({ token });
      const update = await UserController.updateUser(user.id, {
        confirmed_email: true,
        token: null,
      });
      return update;
    } catch (error) {
      throw Error(error.message);
    }
  },
};

module.exports = AuthController;

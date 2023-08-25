require("dotenv").config();
const jwt = require("jsonwebtoken");
const { compareStringToHash } = require("../services/bcrypt.js");

const User = require("../models/index.js")({
  name: "users",
  tableName: "users",
});

const AuthController = {
  async login(req, res) {
    const { email, password_hash } = req.body;

    try {
      const [user] = await User.find({ email });

      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      const passwordMatch = await compareStringToHash(
        password_hash,
        user.password_hash
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  },
};

module.exports = AuthController;

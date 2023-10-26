const jwt = require("jsonwebtoken");

module.exports = {
  loged: (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Token not found!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) =>
      err ? res.status(401).json({ message: "Invalid Token!" }) : next()
    );
  },
};

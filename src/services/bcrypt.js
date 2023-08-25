const bcrypt = require("bcryptjs");
require("dotenv").config();

const generateHash = async (inputString) => {
  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const hashedString = await bcrypt.hash(inputString, saltRounds);
    return hashedString;
  } catch (error) {
    throw error;
  }
};

const compareStringToHash = async (inputString, hashedString) => {
  try {
    const match = await bcrypt.compare(inputString, hashedString);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateHash, compareStringToHash };

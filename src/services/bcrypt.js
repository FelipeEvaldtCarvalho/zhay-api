const bcrypt = require("bcryptjs");
const uuid = require("uuid");

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

const generateUuid = () => uuid.v4();

module.exports = { generateHash, compareStringToHash, generateUuid };

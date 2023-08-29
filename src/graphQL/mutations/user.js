const { GraphQLString, GraphQLInt } = require("graphql");
const { generateHash } = require("../../services/bcrypt.js");
const UserType = require("../types/user.js");

const UserModel = require("../../models/index.js")({
  name: "users",
  tableName: "users",
  selectableProps: ["name", "email"],
});

const userMutations = {
  createUser: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      cpf: { type: GraphQLInt },
      phone: { type: GraphQLString },
      password_hash: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      try {
        const userData = { ...args };
        const hashedPassword = await generateHash(userData.password_hash);
        userData.password_hash = hashedPassword;
        userData.role = "customer";
        console.log(userData);
        await UserModel.create(userData);
        return { msg: "User Created succes", user: userData };
      } catch (error) {
        throw new Error("Error creating user");
      }
    },
  },
};

module.exports = userMutations;

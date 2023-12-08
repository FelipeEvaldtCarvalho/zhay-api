class UserRepository {
  constructor() {
    this.userModel = require("../models/user");
  }

  // async all(pagination) {
  //   console.log(pagination);
  //   try {
  //     return pagination
  //       ? await User.findAll().paginate(pagination)
  //       : await User.findAll();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async findById(id) {
    try {
      const [user] = await this.userModel.find({ id });
      if (!user) {
        return new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(data) {
    try {
      const newUser = await this.userModel.create(data);
      return newUser;
    } catch (error) {
      if (error.errno === 1062) {
        throw Error("E-mail already registered!");
      }
      throw Error(error.message);
    }
  }

  async update(id, data) {
    try {
      const updatedUser = await this.userModel.update(id, data);
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      if (error.errno === 1062) {
        throw new Error("E-mail already registered!");
      }
      throw new Error(error.message);
    }
  }

  // async delete(id) {
  //   try {
  //     const deletedUser = await userModel.destroy(id);
  //     if (!deletedUser || deletedUser.length === 0) {
  //       throw new Error("User not found");
  //     }
  //     this.fetchUsers();
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  async find(args, pagination) {
    try {
      const users = pagination
        ? await this.userModel.find(args).paginate(pagination)
        : await this.userModel.find(args);
      if (!users || !users.length) {
        throw new Error("No user found");
      }
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserRepository();

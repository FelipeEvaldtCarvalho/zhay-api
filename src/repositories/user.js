const User = require("../models/user");

class UserRepository {
  users;
  constructor() {
    this.users = this.fetchUsers();
  }

  async fetchUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async all(pagination) {
    console.log(pagination);
    return pagination
      ? await User.findAll().paginate(pagination)
      : await User.findAll();
  }

  async findById(id) {
    try {
      const [user] = await User.find({ id });
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
      const newUser = await User.create(data);
      this.fetchUsers();
      return newUser;
    } catch (error) {
      if (error.errno === 1062) {
        throw new Error("E-mail already registered!");
      }
      throw new Error(error.message);
    }
  }

  async update(id, data) {
    try {
      const updatedUser = await User.update(id, data);
      if (!updatedUser) {
        throw new Error("User not found");
      }
      this.fetchUsers();
    } catch (error) {
      if (error.errno === 1062) {
        throw new Error("E-mail already registered!");
      }
      throw new Error(error.message);
    }
  }

  async delete(id) {
    try {
      const deletedUser = await User.destroy(id);
      if (!deletedUser || deletedUser.length === 0) {
        throw new Error("User not found");
      }
      this.fetchUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async find(args, pagination) {
    try {
      const users = pagination
        ? await User.find(args).paginate(pagination)
        : await User.find(args);
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

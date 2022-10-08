const { User } = require("../models");

const UserController = {
  async findAllUser(req, res) {
    try {
      const userList = await User.findAll();
      res.send(userList);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = UserController;
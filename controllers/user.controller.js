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
  async findOneUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = UserController;
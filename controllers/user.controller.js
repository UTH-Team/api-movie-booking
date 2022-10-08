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
  async createUser(req, res) {
    const { firstName, lastName, sex, email, password, role } = req.body;
    const newUser = {
      firstName,
      lastName,
      sex,
      email,
      password,
      role,
    };
    try {
      await User.create(newUser);
      res.send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, sex, password, role, avatar } = req.body;
    const user = {
      firstName,
      lastName,
      sex,
      password,
      role,
      avatar,
    };
    try {
      await User.update(user, {
        where: {
          id,
        },
      });
      res.send(`Update user ${id} sucesfully`);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};

module.exports = UserController;
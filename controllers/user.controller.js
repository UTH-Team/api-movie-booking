const { User } = require("../models");

const UserController = {
  async findAllUser(req, res, next) {
    try {
      const userList = await User.findAll();
      res.locals.data = userList;
      next();
    } catch (error) {
      next(error);
    }
  },
  async findOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.locals.data = user;
    } catch (error) {
      next(error);
    }
  },
  async createUser(req, res, next) {
    try {
      const { firstName, lastName, sex, email, password, role } = req.body;
      const newUser = {
        firstName,
        lastName,
        sex,
        email,
        password,
        role,
      };
        await User.create(newUser);
        res.locals.data = newUser;
        next();
      } catch (error) {
        next(error)
      }
  },
  async updateUser(req, res, next) {
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
      next();
    } catch (error) {
      next(error)
    }
  },
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy({
        where: {
          id,
        },
      });
      next();
    } catch (error) {
      next(error)
    }
  },
};

module.exports = UserController;
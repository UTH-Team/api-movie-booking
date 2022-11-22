const { User } = require("../models");
const createError = require("http-errors")
const bcrypt = require('bcryptjs');

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
  async findOneUser(req, res, next) {
    try {
      const { recordDB } = req;
      if (recordDB){
        res.locals.data = recordDB;
        next();
      }
      else {
        next(createError(404, 'USER IS NOT EXIST'));
      }
    } catch (error) {
      next(error);
    }
  },
  async createUser(req, res, next) {
    try {
      const { firstName, lastName, sex, email, password, role } = req.body;
      const salt = bcrypt.genSaltSync(10);
      let hashPassword = bcrypt.hashSync(password, salt);
      const newUser = {
        firstName,
        lastName,
        sex,
        email,
        password: hashPassword,
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
    const { recordDB } = req;
    if (recordDB){
      try {
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
        await User.update(user, {
          where: {
            id,
          },
        });
        next();
      } catch (error) {
        next(error)
      }
    }
    else {
      next(createError(404, 'USER IS NOT EXIST'));
    }
  },
  async deleteUser(req, res, next) {
    const { recordDB } = req;
    if (recordDB){
      res.locals.data = recordDB;
      next();
    }
    else {
      next(createError(404, 'USER IS NOT EXIST'))
    }
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
const { Router } = require('express');

const UserController = require('../controllers/user.controller');
const { checkIDExist } = require('../middlewares/db.middleware');
const { User } = require('./../models')
const userRouter = Router();
const { findAllUser, findOneUser, createUser, updateUser, deleteUser } = UserController;

userRouter.get('/', findAllUser);
userRouter.get('/:id', checkIDExist(User), findOneUser);
userRouter.post('/', createUser);
userRouter.put('/:id', checkIDExist(User), updateUser);
userRouter.delete('/:id', checkIDExist(User), deleteUser);

module.exports = userRouter;

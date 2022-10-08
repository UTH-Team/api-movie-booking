const { Router } = require('express');

const UserController = require('../controllers/user.controller');

const userRouter = Router();
const { findAllUser, findOneUser, createUser, updateUser, deleteUser } = UserController;

userRouter.get('/', findAllUser);
userRouter.get('/:id', findOneUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;

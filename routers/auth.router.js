const { Router } = require("express");
const { signIn, signUp, forgetPassword } = require("../controllers/auth.controller");
const { checkExistEmail, sendEmailForgetPassword } = require("../middlewares/user.middleware");
const { User } = require("../models");

const authRouter = Router();

authRouter.post("/sign-in", checkExistEmail(User), signIn);
authRouter.post("/sign-up", checkExistEmail(User), signUp);
authRouter.post("/forget-password",checkExistEmail(User), sendEmailForgetPassword(), forgetPassword)

module.exports = {
  authRouter,
};

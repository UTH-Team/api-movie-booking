const { Router } = require("express");
const { signIn, signUp } = require("../controllers/auth.controller");
const { checkExistEmail } = require("../middlewares/user.middleware");
const { User } = require("../models");

const authRouter = Router();

authRouter.post("/sign-in", checkExistEmail(User), signIn);
authRouter.post("/sign-up", signUp);

module.exports = {
  authRouter,
};

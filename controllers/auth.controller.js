const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { SIGN_UP_SUCCESS, PASSWORD_IS_NOT_MATCH, LOGIN_SUCCESS } = require("../utils/constants/auth.constant");
require("dotenv").config();

const signIn = async (req, res, next) => {
  const { password } = req.body;
  const { recordDB: user } = req;
  const isValid = bcrypt.compareSync(password, user.password);

  if (isValid) {
    const payload = {
      id: user.id,
    };
    let secretKey = process.env.SECRET_KEY;
    let userToken = jwt.sign(payload, secretKey, {
      expiresIn: "1h",
    });
    res.locals = {
      data: {
        token: userToken,
      },
      message: LOGIN_SUCCESS,
    };
    next();
  } else {
    next(createHttpError(400, PASSWORD_IS_NOT_MATCH));
  }
};

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, sex, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      firstName,
      lastName,
      sex,
      email,
      password: hashPassword,
    };
    await User.create(newUser);
    const result = {
      data: newUser,
      message: SIGN_UP_SUCCESS,
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req;
    const { email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(newPassword, salt);

    await User.update( {password: hashPassword}, {
      where: {
        email
      }
    });
    res.send("Dat mat khau moi thanh cong");
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  signIn,
  signUp,
  forgetPassword,
};

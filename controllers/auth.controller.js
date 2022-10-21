const createHttpError = require("http-errors");
const { User } = require("./../models")

const AuthController = {
  signUp: async (req,res,next)=> {
    const { email, password, firstName, lastName } = req.body;
    try {
      const newUser = { 
        email,
        password,
        firstName,
        lastName,
      }
      await User.create(newUser)
      next()
    } catch (error) {
     next(createHttpError(500)) 
    }
  },
}


module.exports = {
  AuthController
}
const createHttpError = require("http-errors");
const { ACCOUNT_IS_NOT_EXIST } = require("../utils/constants/auth.constant");

const checkExistEmail = (Model) => {
    return async (req,res,next) => {
      try {
        const { email } = req.body;
        const isExist = await Model.findOne({
            where: {
                email
            }
        });
        if( isExist ) {
             req.recordDB = isExist;
             next();
        } else {
            next(createHttpError(404, ACCOUNT_IS_NOT_EXIST))
        }
      } catch (error) {
        next(createHttpError(500, error))
      }
    }
  }
  
  module.exports = {
    checkExistEmail
  }
const createHttpError = require("http-errors");
const { ACCOUNT_IS_NOT_EXIST } = require("../utils/constants/auth.constant");
const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config();

const oauth2Client = new OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET);
oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

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

  const sendEmailForgetPassword = () => {
    return async (req, res, next) => {
      const accessToken = await oauth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.ACCOUNT_EMAIL_HOST,
          accessToken,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });
      try {
        const { email } = req.body;
        const randomNewPass = Math.random().toString(36).slice(-8);
        req.newPassword = randomNewPass;
        //content email
        let info = await transporter.sendMail({
          to: email,
          subject: 'ĐẶT LẠI MẬT KHẨU TÀI KHOẢN MOVIE',
          text: `Mật khẩu mới là : ${randomNewPass} `
        });
        next();
      } catch (error) {
        res.send(error);
        // next(createHttpError.InternalServerError);
      }
    }
  }
  module.exports = {
    checkExistEmail,
    sendEmailForgetPassword,
  }
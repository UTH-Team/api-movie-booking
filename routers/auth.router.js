const { Router } = require('express');
const { AuthController } = require('../controllers/auth.controller');

const authRouter = Router();
const { signUp } = AuthController
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});

module.exports = {
  authRouter
}
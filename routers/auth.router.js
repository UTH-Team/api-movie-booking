const { Router } = require('express');

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {});
authRouter.post('/sign-in', (req, res) => {});
authRouter.post('/reset-password', (req, res) => {});

module.exports = {
  authRouter
}
const { Router } = require('express');

const authRouter = Router();

authRouter.get('/login');
authRouter.post('/login');
authRouter.get('/register');
authRouter.post('/register');
authRouter.get('/logout');

module.exports = authRouter;

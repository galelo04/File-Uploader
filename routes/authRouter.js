const { Router } = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
const authRouter = Router();

authRouter.get('/login', authController.loginGET);
authRouter.post('/login', authController.loginPOST);

authRouter.get('/register', authController.registerGET);
authRouter.post('/register', authController.registerPOST);
authRouter.get('/logout', authController.logout);

module.exports = authRouter;

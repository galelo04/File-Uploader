const { Router } = require('express');
const authController = require('../controllers/authController');
const authRouter = Router();

authRouter.get('/login');
authRouter.post('/login');
authRouter.get('/register', authController.registerGET);
authRouter.post('/register', authController.registerPOST);
authRouter.get('/logout');

module.exports = authRouter;

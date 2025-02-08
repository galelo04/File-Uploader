const { Router } = require('express');
const authRouter = require('./authRouter');
const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

module.exports = indexRouter;

const { Router } = require('express');
const authRouter = require('./authRouter');
const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = indexRouter;

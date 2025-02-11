const { Router } = require('express');
const authRouter = require('./authRouter');
const fileRouter = require('./fileRouter');
const folderRouter = require('./folderRouter');
const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/file', fileRouter);
indexRouter.use('/folder', folderRouter);

indexRouter.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

module.exports = indexRouter;

const { Router } = require('express');
const authRouter = require('./authRouter');
const fileRouter = require('./fileRouter');
const folderRouter = require('./folderRouter');
const folderModel = require('../models/folderModel');
const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/file', fileRouter);
indexRouter.use('/folder', folderRouter);

indexRouter.get('/', async (req, res) => {
  const rootId = await folderModel.getRootFolderId(req.user.id);
  res.render('home', { title: 'Home', rootId });
});

module.exports = indexRouter;

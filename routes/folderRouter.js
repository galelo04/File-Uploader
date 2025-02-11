const { Router } = require('express');

const folderController = require('../controllers/folderController');
const { folder } = require('../config/db');

const folderRouter = Router();

folderRouter.post('/create/:parentId?', folderController.createFolder);
folderRouter.post('/update/:id', folderController.updateFolder);
folderRouter.get('/delete/:id', folderController.deleteFolder);
folderRouter.get('/view/:id', folderController.viewFolder);

module.exports = folderRouter;

const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1000000 } });
const fileController = require('../controllers/fileController');

const fileRouter = Router();

fileRouter.get('/view/:id', fileController.viewFile);
fileRouter.post(
  '/upload/:parentId',
  upload.single('file'),
  fileController.uploadFile
);

fileRouter.get('/download/:id', fileController.downloadFile);
fileRouter.get('/delete/:id', fileController.deleteFile);

module.exports = fileRouter;

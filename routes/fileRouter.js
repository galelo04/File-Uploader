const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1000000 } });
const fileController = require('../controllers/fileController');

const fileRouter = Router();

fileRouter.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = fileRouter;

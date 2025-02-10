const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fileController = require('../controllers/fileController');

const fileRouter = Router();

fileRouter.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = fileRouter;

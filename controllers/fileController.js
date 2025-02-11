const fileModel = require('../models/fileModel');
const cloudinary = require('../config/cloudinary');

const viewFile = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;
    const file = await fileModel.getFileById(ownerId, id);
    res.render('file', {
      title: file.original_name,
      file,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    console.log('file', req.file);
    const results = await cloudinary.uploader.upload(
      `./uploads/${req.file.filename}`
    );
    console.log(res);
    await fileModel.createFile(
      req.file.filename,
      req.file.originalname,
      req.user.id,
      req.params.parentId,
      req.file.mimetype,
      req.file.size,
      results.url
    );
    return res.redirect(`/folder/view/${req.params.parentId}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    await fileModel.deleteFile(userId, id);
    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const file = await fileModel.getFileById(userId, id);
    res.download(`./uploads/${file.file_name}`, file.original_name);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile, deleteFile, downloadFile, viewFile };

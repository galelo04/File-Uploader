const folderModel = require('../models/folderModel');

const createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    const parentId = req.params.parentId || null;
    const ownerId = req.user.id;
    const result = await folderModel.createFolder(
      folderName,
      ownerId,
      parentId
    );
    console.log(result);
    res.redirect('/');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const id = req.params.id;
    await folderModel.deleteFolder(id);
    res.redirect('/');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateFolder = async (req, res) => {
  try {
    const id = req.params.id;
    const { folderName } = req.body;
    await folderModel.updateFolder(id, folderName);
    res.redirect('/');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const viewFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await folderModel.getFolderById(id);
    const childrenFolders = await folderModel.getFoldersByParentId(id);
    res.render('folder', { folder, childrenFolders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFolder,
  deleteFolder,
  updateFolder,
  viewFolder,
};

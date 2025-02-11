const folderModel = require('../models/folderModel');

const createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    let parentId = req.params.parentId;
    let isRoot = false;
    if (parentId === undefined) {
      parentId = await folderModel.getRootFolderId(req.user.id);
      isRoot = true;
    }
    const ownerId = req.user.id;
    await folderModel.createFolder(folderName, ownerId, parentId);
    if (isRoot) res.redirect('/');
    else res.redirect(`/folder/${parentId}`);
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
    const ownerId = req.user.id;
    const folder = await folderModel.getFolderById(ownerId, id);
    const childrenFolders = await folderModel.getFoldersByParentId(ownerId, id);
    res.render('folder', { title: folder.name, folder, childrenFolders });
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

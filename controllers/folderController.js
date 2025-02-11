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
    else res.redirect(`/folder/view/${parentId}`);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const result = await folderModel.deleteFolder(userId, id);
    res.redirect(`/folder/view/${result.parentId}`);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateFolder = async (req, res) => {
  try {
    const id = req.params.id;
    const { folderName } = req.body;
    console.log(folderName);
    const result = await folderModel.updateFolder(id, folderName);
    console.log(result);
    res.redirect(`/folder/view/${result.id}`);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const viewFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;
    const folder = await folderModel.getFolderById(ownerId, id);

    res.render('folder', {
      title: folder.name,
      folder,
      childrenFolders: folder.childrenFolders,
      childrenFiles: folder.childrenFiles,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createFolder,
  deleteFolder,
  updateFolder,
  viewFolder,
};

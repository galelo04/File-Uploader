const prisma = require('../config/db');

const getRootFolderId = async (ownerId) => {
  const rootFolder = await prisma.folder.findFirst({
    where: {
      ownerId: ownerId,
      name: 'root',
    },
  });
  return rootFolder.id;
};

const createFolder = async (name, ownerId, parentId) => {
  return await prisma.folder.create({
    data: {
      name: name,
      Owner: {
        connect: {
          id: ownerId,
        },
      },
      parent: { connect: { id: parentId } },
    },
  });
};

const getFolderById = async (ownerId, id) => {
  return await prisma.folder.findUnique({
    where: {
      id: id,
      ownerId: ownerId,
    },
    include: {
      childrenFolders: true,
      childrenFiles: true,
    },
  });
};

const getFolders = async (ownerId) => {
  return await prisma.folder.findMany({
    where: {
      ownerId: ownerId,
    },
  });
};

const updateFolder = async (id, name) => {
  const rootId = await getRootFolderId();
  if (id === rootId) {
    throw new Error('Cannot update root folder');
  }
  return await prisma.folder.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
};

const deleteFolder = async (ownerId, id) => {
  const rootId = await getRootFolderId();
  if (id === rootId) {
    throw new Error('Cannot delete root folder');
  }
  const folder = await getFolderById(ownerId, id);

  if (folder.childrenFolders.length > 0) {
    throw new Error('Cannot delete folder with children');
  }
  return await prisma.folder.delete({
    where: {
      id: id,
      ownerId: ownerId,
    },
  });
};

module.exports = {
  createFolder,
  getRootFolderId,
  getFolderById,
  getFolders,
  // getFoldersByParentId,
  updateFolder,
  deleteFolder,
};

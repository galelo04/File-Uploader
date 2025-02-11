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
  });
};

const getFoldersByParentId = async (ownerId, parentId) => {
  return await prisma.folder.findMany({
    where: {
      parentId: parentId,
      ownerId: ownerId,
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
  return await prisma.folder.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
};

const deleteFolder = async (id) => {
  return await prisma.folder.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createFolder,
  getRootFolderId,
  getFolderById,
  getFolders,
  getFoldersByParentId,
  updateFolder,
  deleteFolder,
};

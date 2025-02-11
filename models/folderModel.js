const prisma = require('../config/db');

const createFolder = async (name, ownerId, parentId = null) => {
  return await prisma.folder.create({
    data: {
      name: name,
      Owner: {
        connect: {
          id: ownerId,
        },
      },
      parent: parentId ? { connect: { id: parentId } } : null,
    },
  });
};

const getFolderById = async (id) => {
  return await prisma.folder.findUnique({
    where: {
      id: id,
    },
  });
};

const getFoldersByParentId = async (parentId) => {
  return await prisma.folder.findMany({
    where: {
      parentId: parentId,
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
  getFolderById,
  getFolders,
  getFoldersByParentId,
  updateFolder,
  deleteFolder,
};

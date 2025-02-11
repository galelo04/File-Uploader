const prisma = require('../config/db');

const createFile = async (
  filename,
  originalname,
  ownerId,
  parentId,
  type,
  size,
  url
) => {
  return await prisma.file.create({
    data: {
      file_name: filename,
      original_name: originalname,
      Owner: {
        connect: {
          id: ownerId,
        },
      },
      parent: { connect: { id: parentId } },
      type: type,
      size: size,
      url: url,
    },
  });
};

const getFileById = async (ownerId, id) => {
  return await prisma.file.findUnique({
    where: {
      id: id,
      ownerId: ownerId,
    },
  });
};
const deleteFile = async (ownerId, id) => {
  return await prisma.file.delete({
    where: {
      id: id,
      ownerId: ownerId,
    },
  });
};

module.exports = { createFile, getFileById, deleteFile };

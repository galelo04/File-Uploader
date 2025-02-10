const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
};

module.exports = { getUserByEmail, getUserById, registerUser };

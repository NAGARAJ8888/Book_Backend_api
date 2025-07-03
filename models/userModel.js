const { readJSON, writeJSON } = require('../utils/fileHelper');
const filePath = './data/users.json';

async function getUsers() {
  return await readJSON(filePath);
}

async function saveUsers(users) {
  await writeJSON(filePath, users);
}

async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find(user => user.email === email);
}

async function findUserById(id) {
  const users = await getUsers();
  return users.find(user => user.id === id);
}

async function addUser(user) {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
  return user;
}

module.exports = {
  getUsers,
  saveUsers,
  findUserByEmail,
  findUserById,
  addUser
};

const { readJSON, writeJSON } = require('../utils/fileHelper');
const file = './data/books.json';

async function getBooks() {
  return await readJSON(file);
}

async function saveBooks(data) {
  await writeJSON(file, data);
}

module.exports = { getBooks, saveBooks };

const fs = require('fs').promises;

const readJSON = async (file) => JSON.parse(await fs.readFile(file, 'utf8'));
const writeJSON = async (file, data) => await fs.writeFile(file, JSON.stringify(data, null, 2));

module.exports = { readJSON, writeJSON };

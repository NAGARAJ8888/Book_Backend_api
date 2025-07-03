const { v4: uuidv4 } = require('uuid');
const { getBooks, saveBooks } = require('../models/bookModel');

const getAll = async (req, res) => {
  let books = await getBooks();
  if (req.query.genre) books = books.filter(b => b.genre === req.query.genre);
  const { page = 1, limit = 10 } = req.query;
  const start = (page - 1) * limit;
  res.json(books.slice(start, start + +limit));
};

const getById = async (req, res) => {
  const books = await getBooks();
  const book = books.find(b => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: 'Not found' });
};

const create = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const newBook = { id: uuidv4(), title, author, genre, publishedYear, userId: req.user.id };
  const books = await getBooks();
  books.push(newBook);
  await saveBooks(books);
  res.status(201).json(newBook);
};

const update = async (req, res) => {
  const books = await getBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1 || books[index].userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

  books[index] = { ...books[index], ...req.body };
  await saveBooks(books);
  res.json(books[index]);
};

const remove = async (req, res) => {
  let books = await getBooks();
  const book = books.find(b => b.id === req.params.id);
  if (!book || book.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

  books = books.filter(b => b.id !== req.params.id);
  await saveBooks(books);
  res.status(204).end();
};

module.exports = { getAll, getById, create, update, remove };

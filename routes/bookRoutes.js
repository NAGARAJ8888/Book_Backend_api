const express = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth);
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;

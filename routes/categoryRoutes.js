const express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth("admin"), addCategory);
router.put('/:id', auth("admin"), updateCategory);
router.delete('/:id', auth("admin"), deleteCategory);
router.get('/', getCategories);

module.exports = router;

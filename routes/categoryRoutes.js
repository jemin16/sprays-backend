const express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, isAdmin, addCategory);
router.put('/:id', authenticate, isAdmin, updateCategory);
router.delete('/:id', authenticate, isAdmin, deleteCategory);
router.get('/', getCategories);

module.exports = router;

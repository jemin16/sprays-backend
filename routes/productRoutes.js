const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, isAdmin, addProduct);
router.put('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);
router.get('/:categoryId', getProductsByCategory);

module.exports = router;

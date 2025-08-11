const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../controllers/productController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth("admin"), addProduct);
router.put('/:id', auth("admin"), updateProduct);
router.delete('/:id', auth("admin"), deleteProduct);
router.get('/:categoryId', getProductsByCategory);

module.exports = router;

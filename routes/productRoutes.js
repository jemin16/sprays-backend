const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../controllers/productController');
const { auth } = require('../middlewares/authMiddleware');
const createMulterUpload = require('../middlewares/uploadImage');

const router = express.Router();

router.post('/', auth("admin"), createMulterUpload('uploads/products').single('image'), addProduct);
router.put('/:id', auth("admin"), createMulterUpload('uploads/products').single('image'), updateProduct);
router.delete('/:id', auth("admin"), deleteProduct);
router.get('/:categoryId', getProductsByCategory);

module.exports = router;

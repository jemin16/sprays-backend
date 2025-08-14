const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/authMiddleware');

const { addVariant, getVariantsByProduct } = require('../controllers/variantController');

router.post('/', auth("admin"), addVariant);
router.get('/:product_id', getVariantsByProduct);

module.exports = router;
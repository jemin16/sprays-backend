const express = require("express");
const router = express.Router();

const createMulterUpload = require("../middlewares/uploadImage");

const upload = createMulterUpload("uploads/variant_images");

const { auth } = require("../middlewares/authMiddleware");

const { addVariantImages, getVariantImagesByProductId } = require("../controllers/variantImageController");

router.post("/", auth("admin"), upload.array("images", 10), addVariantImages);
router.get("/:product_id", getVariantImagesByProductId);

module.exports = router;

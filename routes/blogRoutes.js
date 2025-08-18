const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddleware");

const createMulterUpload = require("../middlewares/uploadImage");

const upload = createMulterUpload("uploads/blog");

const blogController = require("../controllers/blogController");

router.post("/add", auth("admin"), upload.fields([
    { name: "image", maxCount: 1 },
    { name: "single_img", maxCount: 1 }
]), blogController.addBlog);
router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", auth("admin"), upload.fields([
    { name: "image", maxCount: 1 },
    { name: "single_img", maxCount: 1 }
]), blogController.updateBlog);
router.delete("/:id", auth("admin"), blogController.deleteBlog);

module.exports = router;

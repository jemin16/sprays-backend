const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddleware");

const { addComment, getCommentsByBlog, getCommentById, updateComment, deleteComment } = require("../controllers/blogCommentController");

router.post("/", auth("user"), addComment);
router.get("/blog/:blog_id", getCommentsByBlog);
router.get("/comment/:id", getCommentById);
router.put("/comment/:id", auth("user"), updateComment);
router.delete("/comment/:id", auth("admin"), deleteComment);

module.exports = router;
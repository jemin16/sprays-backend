const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddleware");

const { addFaq, getFaqs, deleteFaq, updateFaq } = require("../controllers/faqsController");

router.post("/", auth("admin"), addFaq);
router.get("/", getFaqs);
router.delete("/:id", auth("admin"), deleteFaq);
router.put("/:id", auth("admin"), updateFaq);

module.exports = router;

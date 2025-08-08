const express = require("express");
const router = express.Router();

const { authenticate, isAdmin } = require("../middlewares/authMiddleware");

const { register, login, verifyOTP, getAllUsers } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.get("/admin/users", authenticate, isAdmin, getAllUsers);

module.exports = router;

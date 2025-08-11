const express = require("express");
const { registerUser, loginUser, verifyOtp, getUserProfile } = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.get("/profile", auth("user"), getUserProfile);

module.exports = router;

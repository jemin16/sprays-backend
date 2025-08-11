const express = require("express");
const { registerAdmin, loginAdmin, getAllUsers } = require("../controllers/adminController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/users", auth("admin"), getAllUsers);

module.exports = router;

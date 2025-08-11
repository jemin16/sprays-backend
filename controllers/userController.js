const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { full_name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = ("" + Math.floor(100000 + Math.random() * 900000)).substring(0, 6);
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await db.query("CALL register_user(?, ?, ?, ?, ?)", [full_name, email, hashedPassword, otp, otpExpiry]);

        console.log(`OTP for ${email}: ${otp}`);

        res.json({ message: "User registered. Verify OTP sent to email." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp_code } = req.body;
    try {
        const [result] = await db.query("CALL verify_user_otp(?, ?)", [email, otp_code]);
        if (result.affectedRows === 0) return res.status(400).json({ error: "Invalid or expired OTP" });
        res.json({ message: "OTP verified successfully. You can now login." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query("CALL login_user(?)", [email]);
        const user = rows[0][0];
        if (!user) return res.status(400).json({ error: "User not found" });
        if (!user.is_verified) return res.status(400).json({ error: "Please verify OTP before logging in" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, full_name, email, created_at FROM users WHERE id = ?", [req.user.id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

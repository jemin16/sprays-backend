const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
    const { full_name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("CALL register_admin(?, ?, ?)", [full_name, email, hashedPassword]);
        res.json({ message: "Admin registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query("CALL login_admin(?)", [email]);
        const admin = rows[0][0];
        if (!admin) return res.status(400).json({ error: "Admin not found or inactive" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, full_name, email, is_verified, created_at FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createDefaultAdmin = async () => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM admin WHERE email = ?",
            [process.env.ADMIN_EMAIL]
        );

        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            await db.query("CALL register_admin(?, ?, ?)", [
                process.env.ADMIN_FULLNAME,
                process.env.ADMIN_EMAIL,
                hashedPassword
            ]);
            console.log("✅ Default admin created");
        } else {
            console.log("ℹ️ Admin already exists");
        }
    } catch (err) {
        console.error("Error creating default admin:", err.message);
    }
};
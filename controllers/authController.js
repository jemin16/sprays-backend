const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { generateOTP, sendOTPEmail } = require('../utils/otp');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('CALL register_user(?, ?, ?, ?)', [name, email, hashedPassword, role || 'user']);

        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        await db.query(
            'UPDATE users SET otp_code = ?, otp_expires_at = ? WHERE email = ?',
            [otp, expiresAt, email]
        );

        await sendOTPEmail(email, otp);

        res.status(201).json({ message: 'Registered. OTP sent to email for verification.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = result[0];

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.otp_code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (new Date(user.otp_expires_at) < new Date()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        await db.query('UPDATE users SET is_verified = 1, otp_code = NULL, otp_expires_at = NULL WHERE id = ?', [user.id]);
        res.json({ message: 'Email verified successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [[user]] = await db.query('CALL login_user(?)', [email]);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.is_verified) {
            return res.status(403).json({ message: "Email not verified. Please complete OTP verification." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, role, is_verified, created_at FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const db = require('../config/db');

exports.addFeedback = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            phone_number,
            description
        } = req.body;

        await db.query(
            'CALL insert_feedback(?, ?, ?, ?, ?)',
            [first_name, last_name, email, phone_number, description]
        );

        res.json({ message: 'Feedback added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getFeedbacks = async (req, res) => {
    try {
        const [feedbacks] = await db.query('SELECT * FROM feedback');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM feedback WHERE id = ?', [id]);
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const db = require('../config/db');

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await db.query('CALL add_category(?)', [name]);
        res.json({ message: 'Category added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        await db.query('CALL update_category(?, ?)', [id, name]);
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('CALL delete_category(?)', [id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

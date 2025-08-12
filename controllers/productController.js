const db = require('../config/db');

exports.addProduct = async (req, res) => {
    try {
        const { category_id, name } = req.body;
        await db.query('CALL add_product(?, ?)', [category_id, name]);
        res.json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { category_id, name } = req.body;
        const { id } = req.params;
        await db.query('CALL update_product(?, ?, ?)', [id, category_id, name]);
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('CALL delete_product(?)', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const [products] = await db.query('SELECT * FROM products WHERE category_id = ?', [categoryId]);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

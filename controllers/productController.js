const db = require('../config/db');

exports.addProduct = async (req, res) => {
    try {
        const {
            category_id,
            name,
            slug,
            description,
            stock,
            is_active,
            rating
        } = req.body;

        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const finalSlug = slug || name?.toLowerCase().replace(/\s+/g, '-').substring(0, 255);

        await db.query(
            'CALL add_product(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [category_id, name, finalSlug, description, image, stock, is_active, rating]
        );

        res.json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const {
            category_id,
            name,
            slug,
            description,
            is_active,
            rating,
            stock
        } = req.body;

        const { id } = req.params;

        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const finalSlug = slug || name?.toLowerCase().replace(/\s+/g, '-').substring(0, 255);

        await db.query(
            'CALL update_product(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, category_id, name, finalSlug, description, is_active, image, rating, stock]
        );

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

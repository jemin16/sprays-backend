const db = require("../config/db");

exports.getProducts = async (req, res) => {
    try {
        const { stock, minPrice, maxPrice, brand, weight, customLabel } = req.query;

        let query = `
        SELECT 
            c.id AS category_id,
            c.name AS category_name,
            p.id AS product_id,
            p.name AS product_name,
            p.slug,
            p.description,
            p.image AS product_image,
            p.stock,
            p.brand,
            p.custom_label,
            v.id AS variant_id,
            v.color,
            v.weight,
            v.original_price,
            v.discount_price,
            vi.images
        FROM categories c
        JOIN products p ON c.id = p.category_id
        LEFT JOIN variants v ON p.id = v.product_id
        LEFT JOIN variant_images vi ON v.id = vi.variant_id
        WHERE 1=1
      `;

        const params = [];

        if (stock) {
            query += " AND p.stock >= ?";
            params.push(stock);
        }

        if (minPrice && maxPrice) {
            query += " AND v.original_price BETWEEN ? AND ?";
            params.push(minPrice, maxPrice);
        }

        if (brand) {
            query += " AND p.brand = ?";
            params.push(brand);
        }

        if (weight) {
            query += " AND v.weight = ?";
            params.push(weight);
        }

        if (customLabel) {
            query += " AND p.custom_label = ?";
            params.push(customLabel);
        }

        query += " ORDER BY p.created_at DESC";

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
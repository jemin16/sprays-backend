const db = require("../config/db"); // MySQL connection

exports.addVariant = async (req, res) => {
    try {
        const { product_id, color, weight, original_price, discount_price } = req.body;

        await db.query(
            "CALL add_variant(?, ?, ?, ?, ?)",
            [product_id, color, weight, original_price, discount_price]
        );

        res.status(201).json({ message: "Variant added successfully" });
    } catch (error) {
        console.error("Error adding variant:", error.sqlMessage || error.message);
        res.status(500).json({ error: error.sqlMessage || error.message });
    }
};

exports.getVariantsByProduct = async (req, res) => {
    try {
        const { product_id } = req.params;

        if (!product_id) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const [rows] = await db.query("CALL get_variants_by_product(?)", [product_id]);

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching variants:", error.sqlMessage || error.message);
        res.status(500).json({ error: error.sqlMessage || error.message });
    }
};
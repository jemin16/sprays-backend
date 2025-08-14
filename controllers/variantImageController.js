const db = require("../config/db");

exports.addVariantImages = async (req, res) => {
    try {
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(400).json({ error: "product_id is required" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const imagePaths = req.files.map(file => file.filename);

        const [result] = await db.query("CALL add_variant_images_json(?, ?)", [
            product_id,
            JSON.stringify(imagePaths)
        ]);

        res.status(201).json({
            message: "Product images uploaded successfully",
            images: imagePaths
        });
    } catch (error) {
        console.error("Error uploading product images:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getVariantImagesByProductId = async (req, res) => {
    try {
        const { product_id } = req.params;

        const [rows] = await db.query(
            "SELECT * FROM variant_images WHERE product_id = ?",
            [product_id]
        );

        const data = rows.map(row => {
            let images = row.images;
            try {
                if (typeof images === 'string') {
                    images = JSON.parse(images);
                }
                if (typeof images === 'string') {
                    images = [images];
                }
            } catch (e) {
                images = [images];
            }

            return {
                ...row,
                images: Array.isArray(images) ? images : [images]
            };
        });

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching product images:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

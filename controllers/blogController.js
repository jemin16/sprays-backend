const db = require("../config/db");
const dayjs = require("dayjs");

exports.addBlog = async (req, res) => {
    try {
        const image = req.files.image ? req.files.image[0].filename : null;
        const single_img = req.files.single_img ? req.files.single_img[0].filename : null;

        const {
            stored_key,
            published_date,
            tag,
            title,
            description,
            short_desc,
            short_desc2,
            quote
        } = req.body;

        const [result] = await db.query(
            "CALL addBlog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                image,
                stored_key,
                dayjs(published_date).format("YYYY-MM-DD"),
                tag,
                title,
                description,
                short_desc,
                short_desc2,
                single_img,
                quote
            ]
        );

        res.status(201).json({
            success: true,
            message: "Blog added successfully",
            data: result
        });

    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const [result] = await db.query("CALL getBlogs()");
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: result
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("CALL getBlogById(?)", [id]);
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: result
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { stored_key, published_date, tag, title, description, short_desc, short_desc2, quote } = req.body;
        const [result] = await db.query("CALL updateBlog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, stored_key, dayjs(published_date).format("YYYY-MM-DD"), tag, title, description, short_desc, short_desc2, quote]);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: result
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("CALL deleteBlog(?)", [id]);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: result
        });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

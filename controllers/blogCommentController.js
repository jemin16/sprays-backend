const db = require("../config/db");

exports.addComment = async (req, res) => {
    try {
        const { blog_id, user_id, name, email, message } = req.body;

        const [result] = await db.query(
            "CALL add_comment(?, ?, ?, ?, ?)",
            [blog_id, user_id, name, email, message]
        );

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
        });

    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getCommentsByBlog = async (req, res) => {
    try {
        const { blog_id } = req.params;
        const [result] = await db.query("CALL get_comments_by_blog_id(?)", [blog_id]);
        res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            data: result
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("CALL get_comment_by_id(?)", [id]);
        res.status(200).json({
            success: true,
            message: "Comment fetched successfully",
            data: result
        });
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const [result] = await db.query("CALL update_comment(?, ?)", [id, message]);
        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("CALL delete_comment(?)", [id]);
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
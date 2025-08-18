const db = require("../config/db");

exports.addFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const [result] = await db.query("CALL insert_faq(?, ?)", [question, answer]);
        res.status(200).json({
            success: true,
            message: "FAQ added successfully",
        });
    } catch (error) {
        console.error("Error adding FAQ:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getFaqs = async (req, res) => {
    try {
        const [result] = await db.query("CALL get_faq()");
        res.status(200).json({
            success: true,
            message: "FAQs fetched successfully",
            data: result
        });
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("CALL delete_faq(?)", [id]);
        res.status(200).json({
            success: true,
            message: "FAQ deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const [result] = await db.query("CALL update_faq(?, ?, ?)", [id, question, answer]);
        res.status(200).json({
            success: true,
            message: "FAQ updated successfully",
        });
    } catch (error) {
        console.error("Error updating FAQ:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

const { createDefaultAdmin } = require("./controllers/adminController");
(async () => {
    await createDefaultAdmin();
})();


const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const variantRoutes = require("./routes/variantRoutes");
const variantImageRoutes = require("./routes/variantImageRoutes");
const blogRoutes = require("./routes/blogRoutes");
const blogCommentRoutes = require("./routes/blogCommentsRoutes");
const faqsRoutes = require("./routes/faqsRoutes");
const filterRoutes = require("./routes/filterRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/variant", variantRoutes);
app.use("/api/variantImage", variantImageRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/blogComment", blogCommentRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/filter", filterRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

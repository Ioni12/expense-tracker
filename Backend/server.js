const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const categoryRoutes = require("./routes/categories");
const expenseRoutes = require("./routes/expenses");

const app = express();

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(process.env.PORT, () => console.log("server is up"));

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  categoryId: ObjectId,
  amount: Number,
  description: String,
  createdAt: Date,
});

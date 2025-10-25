const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
});

module.exports = mongoose.model("Category", categorySchema);

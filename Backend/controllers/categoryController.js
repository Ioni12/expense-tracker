const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createAt: -1 });
    return res.status(200).json({ ok: true, data: categories });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ ok: false, error: "Category name is required" });
    }

    const category = new Category({ name, createdAt: Date.now() });
    category.save();

    return res.status(200).json({ ok: true, data: category });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = { getCategories, createCategory };

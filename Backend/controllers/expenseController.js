const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("categoryId", "name");

    return res.status(200).json({ ok: true, data: expenses });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const { categoryId, amount, description } = req.body;

    if (!categoryId || !amount || !description) {
      return res.status(400).json({
        ok: false,
        error: "Please give all of the required information",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        ok: false,
        error: "Amount must be greater than 0",
      });
    }

    const expense = new Expense({ categoryId, amount, description });
    await expense.save();

    return res.status(200).json({ ok: true, data: expense });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(400).json({ ok: false, error: "no expense found" });
    }

    return res.status(200).json({ ok: true, data: expense });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message });
  }
};

module.exports = { getExpenses, createExpense, deleteExpense };

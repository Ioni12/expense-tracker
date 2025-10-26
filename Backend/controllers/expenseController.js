const Expense = require("../models/Expense");
const { sendBudgetAlert } = require("../services/emailService");

const BUDGET_LIMIT = 1000;

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

    const totalSpent = await Expense.aggregate([
      {
        $match: {
          categoryId: categoryId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const total =
      totalSpent.length > 0 ? Number(totalSpent[0].total) : Number(amount);

    if (total > BUDGET_LIMIT) {
      const populatedExpense = await Expense.findById(expense._id).populate(
        "categoryId",
        "name"
      );
      const categoryName =
        populatedExpense.categoryId?.name || "unknown category";

      sendBudgetAlert(
        process.env.BREVO_RECEIVER_EMAIL,
        total,
        BUDGET_LIMIT,
        categoryName
      ).catch((err) => {
        console.log("failed to send email: ", err);
      });

      return res.status(200).json({
        ok: true,
        data: expense,
        budgetWarning: {
          message: `Budget exceeded for ${categoryName}!`,
          totalSpent: total,
          budgetLimit: BUDGET_LIMIT,
          overBy: (total - BUDGET_LIMIT).toFixed(2),
        },
      });
    }

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

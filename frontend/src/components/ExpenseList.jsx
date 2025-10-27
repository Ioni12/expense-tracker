import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../services/expenseService";

const ExpenseList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getExpenses();
      setData(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading)
    return <div className="text-center py-4 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  if (data.length === 0)
    return (
      <div className="text-center py-4 text-gray-600">No expenses found</div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses</h2>
      <ul className="space-y-2">
        {data.map((expense) => (
          <li
            key={expense._id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-medium text-gray-800">
                  {expense.description}
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                  {expense.categoryId.name}
                </span>
              </div>
              <span className="text-green-600 font-semibold text-lg">
                ${expense.amount}
              </span>
            </div>
            <button
              onClick={() => handleDelete(expense._id)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

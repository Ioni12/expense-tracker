import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/expenses",
});

export const getExpenses = async () => {
  try {
    const response = await api.get();

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch Expenses");
  }
};

export const createExpense = async (data) => {
  try {
    const response = await api.post("", data);

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to create Expense");
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/${id}`);

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

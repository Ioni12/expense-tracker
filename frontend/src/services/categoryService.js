import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/categories",
});

export const getCategories = async () => {
  try {
    const response = await api.get();

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch categories");
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post("", data);

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to create the categorie");
  }
};

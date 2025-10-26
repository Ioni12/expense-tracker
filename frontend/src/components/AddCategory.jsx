import React, { useState } from "react";
import { createCategory } from "../services/categoryService";

const AddCategory = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      await createCategory({ name: name.trim() });
      setName("");
      setSuccess(true);

      if (onCategoryCreated) {
        onCategoryCreated();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            disabled={loading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating..." : "Add"}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-50 px-3 py-2 rounded-md">
            Category created successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCategory;

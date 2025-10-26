import React, { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import AddCategory from "./AddCategory";

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategories();
      setData(result.data);
    } catch (err) {
      setError(err.message || "Could not fetch the categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading)
    return <div className="text-center py-4 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  if (!data)
    return <div className="text-center py-4 text-gray-600">No data</div>;

  return (
    <div className="space-y-4">
      <AddCategory onCategoryCreated={fetchCategories} />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {data.map((category) => (
            <span
              key={category._id}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;

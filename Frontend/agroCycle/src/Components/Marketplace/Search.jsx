import { useEffect, useState } from "react";
import { Search, Boxes } from "lucide-react";
import { getCategories } from "../../api/categories";

function SearchFilterBar({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  resultCount,
  totalCount,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4">
            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by type, location, or description..."
              className="w-full ml-3 outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4">
            <Boxes className="text-gray-400" size={20} />

            <select
              value={categoryId}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full ml-3 outline-none bg-transparent text-gray-700 cursor-pointer"
            >
              <option value="">All Types</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-gray-500 mt-6">
          Showing {resultCount ?? 0} of {totalCount ?? 0} listings
        </p>
      </div>
    </div>
  );
}

export default SearchFilterBar;

import { useEffect, useState } from "react";
import { Search, Boxes } from "lucide-react";
import { getCategories } from "../../api/categories";

function SearchFilterBar({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  status,
  onStatusChange,
  isAdmin,
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
    <div className="max-w-7xl mx-auto -mt-8 relative z-10 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
            <Search className="text-gray-400" size={17} />

            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by type, location, or description..."
              className="w-full ml-2.5 outline-none text-sm text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-green-500/30 focus-within:border-green-500 transition">
            <Boxes className="text-gray-400" size={17} />

            <select
              value={categoryId}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full ml-2.5 outline-none bg-transparent text-sm text-gray-700 cursor-pointer"
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

        <p className="text-gray-400 text-xs mt-5">
          Showing {resultCount ?? 0} of {totalCount ?? 0} listings
        </p>
      </div>
    </div>
  );
}

export default SearchFilterBar;

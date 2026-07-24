import React from "react";
import { Search, Boxes } from "lucide-react";

function SearchFilterBar() {
  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4">
            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Search by type, location, or description..."
              className="w-full ml-3 outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4">
            <Boxes className="text-gray-400" size={20} />

            <select className="w-full ml-3 outline-none bg-transparent text-gray-700 cursor-pointer">
              <option>All Types</option>
              <option>Rice Husk</option>
              <option>Coconut Shell</option>
              <option>Wheat Straw</option>
              <option>Sugarcane Bagasse</option>
            </select>
          </div>
        </div>

        <p className="text-gray-500 mt-6">Showing 6 of 6 listings</p>
      </div>
    </div>
  );
}

export default SearchFilterBar;

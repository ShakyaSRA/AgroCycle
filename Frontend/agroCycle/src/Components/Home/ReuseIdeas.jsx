import React from "react";

function ReuseIdeas({ icon, title, item1, item2, item3, item4 }) {
  return (
    <div>
      <div className="bg-green-50/40 border border-none shadow-md p-6 rounded-2xl w-full max-w-sm m-4 hover:shadow-xl transition duration-300">
        <div className="w-24 h-24 bg-green-100/50 rounded-full flex items-center justify-center mx-auto text-green-600 hover:bg-green-200 transition duration-300">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 hover:text-green-700 transition duration-300">
          {title}
        </h3>

        <ul className="mt-6 space-y-3 text-gray-700 w-70 ">
          <li className="bg-white border border-1 border-green-500/30 rounded-xl shadow-sm p-2 flex items-center gap-3">
            <div class="h-2 w-2 bg-green-500 rounded-full "></div>
            {item1}
          </li>
          <li className="bg-white border border-1 border-green-500/30 rounded-xl shadow-sm p-2 flex items-center gap-3">
            <div class="h-2 w-2 bg-green-500 rounded-full "></div>
            {item2}
          </li>
          <li className="bg-white border border-1 border-green-500/30 rounded-xl shadow-sm p-2 flex items-center gap-3">
            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
            {item3}
          </li>
          <li className="bg-white border border-1 border-green-500/30 rounded-xl shadow-sm p-2 flex items-center gap-3">
            <div class="h-2 w-2 bg-green-500 rounded-full "></div>
            {item4}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReuseIdeas;

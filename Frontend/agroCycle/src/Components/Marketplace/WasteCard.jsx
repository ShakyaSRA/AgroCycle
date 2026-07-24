import React from "react";

function WasteCard({ title, description, weight, item1, item2, item3 }) {
  return (
    <div className="border border-green-100 border-t-4 border-t-green-600 shadow-md p-6 rounded-2xl bg-white hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-900 hover:text-green-700 transition duration-300">
          {title}
        </h3>

        <div className="mt-4 inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full font-medium">
          {weight}
        </div>
      </div>
      <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>

      <ul className="mt-6 space-y-3 text-gray-700">
        <li className=" flex items-center gap-3">{item1}</li>

        <li className=" flex items-center gap-3">{item2}</li>

        <li className="sflex items-center gap-3">{item3}</li>
      </ul>

      <button className="mt-6 w-full bg-green-600 cursor-pointer text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 hover:text-white hover:scale-105 transition duration-300">
        Request Pickup
      </button>
    </div>
  );
}

export default WasteCard;

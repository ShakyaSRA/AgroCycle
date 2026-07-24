import React from "react";

function StatsCard({ icon, title, value, growth, iconColor }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="flex justify-between">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>

        <span className="text-green-600 font-semibold">+{growth}%</span>
      </div>

      <p className="text-gray-500 mt-6">{title}</p>
      <h2 className="text-4xl font-bold">{value}</h2>
    </div>
  );
}

export default StatsCard;

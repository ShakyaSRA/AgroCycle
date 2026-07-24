import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", users: 45 },
  { month: "Feb", users: 62 },
  { month: "Mar", users: 78 },
  { month: "Apr", users: 95 },
  { month: "May", users: 112 },
];

function UserGrowthChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-8">User Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="users" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserGrowthChart;

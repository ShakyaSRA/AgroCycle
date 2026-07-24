import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenue = [
  { month: "Jan", amount: 80000 },
  { month: "Feb", amount: 120000 },
  { month: "Mar", amount: 160000 },
  { month: "Apr", amount: 220000 },
  { month: "May", amount: 280000 },
];

function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-8">Revenue Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenue}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="amount" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;

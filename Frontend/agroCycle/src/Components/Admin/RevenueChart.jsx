import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fadeUp } from "../../lib/motion";

function RevenueChart({ data }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h2>

      {!data ? (
        <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => `LKR ${Number(value).toLocaleString()}`} />

            <Bar
              dataKey="amount"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}

export default RevenueChart;

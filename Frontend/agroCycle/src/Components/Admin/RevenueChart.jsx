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
      className="bg-white p-6 rounded-2xl shadow"
    >
      <h2 className="text-3xl font-bold mb-8">Revenue Trend</h2>

      {!data ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `LKR ${Number(value).toLocaleString()}`} />

            <Bar
              dataKey="amount"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
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

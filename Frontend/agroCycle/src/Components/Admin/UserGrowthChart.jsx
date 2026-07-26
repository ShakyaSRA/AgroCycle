import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fadeUp } from "../../lib/motion";

function UserGrowthChart({ data }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">User Growth</h2>

      {!data ? (
        <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 3 }}
              isAnimationActive
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}

export default UserGrowthChart;

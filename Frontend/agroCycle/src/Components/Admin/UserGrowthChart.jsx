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
      className="bg-white p-6 rounded-2xl shadow"
    >
      <h2 className="text-3xl font-bold mb-8">User Growth</h2>

      {!data ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
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

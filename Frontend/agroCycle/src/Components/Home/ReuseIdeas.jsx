import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

function ReuseIdeas({ icon, title, item1, item2, item3, item4 }) {
  return (
    <motion.div variants={fadeUp}>
      <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl w-full max-w-sm hover:shadow-md transition-shadow duration-300">
        <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-600 [&>svg]:w-5 [&>svg]:h-5">
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-5">
          {title}
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
            {item1}
          </li>
          <li className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
            {item2}
          </li>
          <li className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
            {item3}
          </li>
          <li className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
            {item4}
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

export default ReuseIdeas;

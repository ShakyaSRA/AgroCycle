import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp } from "../../lib/motion";
import { REUSE_ICON_OPTIONS } from "../../lib/reuseIcons";

function PendingReuseIdeaCard({ idea, onApprove, onReject }) {
  const [selectedIcon, setSelectedIcon] = useState("lightbulb");

  return (
    <motion.div variants={fadeUp} layout className="rounded-2xl border border-gray-200 p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{idea.title}</h3>
          <p className="mt-2 text-gray-700">Posted by: {idea.user?.name}</p>
        </div>
        <p className="text-gray-500">
          {new Date(idea.created_at).toLocaleDateString()}
        </p>
      </div>

      <ul className="mt-4 space-y-2 text-gray-700">
        {(idea.items || []).map((item, i) => (
          <li
            key={i}
            className="bg-gray-50 border border-gray-200 rounded-xl p-2 flex items-center gap-3"
          >
            <div className="h-2 w-2 bg-green-500 rounded-full shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <p className="text-gray-500 text-sm font-medium mb-2">
          Choose an icon before approving:
        </p>
        <div className="flex flex-wrap gap-2">
          {REUSE_ICON_OPTIONS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              title={label}
              onClick={() => setSelectedIcon(key)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition ${
                selectedIcon === key
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onApprove(selectedIcon)}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-green-700"
        >
          <Check size={18} />
          Approve
        </button>

        <button
          onClick={onReject}
          className="flex-1 bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-red-700"
        >
          <X size={18} />
          Reject
        </button>
      </div>
    </motion.div>
  );
}

export default PendingReuseIdeaCard;

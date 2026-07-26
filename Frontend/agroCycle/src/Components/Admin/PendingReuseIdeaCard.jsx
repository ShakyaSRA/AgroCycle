import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp } from "../../lib/motion";
import { REUSE_ICON_OPTIONS } from "../../lib/reuseIcons";

function PendingReuseIdeaCard({ idea, onApprove, onReject }) {
  const [selectedIcon, setSelectedIcon] = useState("lightbulb");

  return (
    <motion.div variants={fadeUp} layout className="rounded-xl border border-gray-200 p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{idea.title}</h3>
          <p className="mt-1.5 text-sm text-gray-600">Posted by: {idea.user?.name}</p>
        </div>
        <p className="text-gray-400 text-xs">
          {new Date(idea.created_at).toLocaleDateString()}
        </p>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {(idea.items || []).map((item, i) => (
          <li
            key={i}
            className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2.5"
          >
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <p className="text-gray-500 text-xs font-medium mb-2">
          Choose an icon before approving:
        </p>
        <div className="flex flex-wrap gap-2">
          {REUSE_ICON_OPTIONS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              title={label}
              onClick={() => setSelectedIcon(key)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                selectedIcon === key
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 mt-5">
        <button
          onClick={() => onApprove(selectedIcon)}
          className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Check size={16} />
          Approve
        </button>

        <button
          onClick={onReject}
          className="flex-1 bg-red-600 text-white text-sm font-medium py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <X size={16} />
          Reject
        </button>
      </div>
    </motion.div>
  );
}

export default PendingReuseIdeaCard;

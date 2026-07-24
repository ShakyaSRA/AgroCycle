import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { fadeUp } from "../../lib/motion";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function RequestCard({ request, onAccept, onReject }) {
  const navigate = useNavigate();
  const date = new Date(request.created_at).toLocaleDateString();

  return (
    <motion.div variants={fadeUp} className="border rounded-2xl p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{request.buyer?.name}</h3>

          <p className="text-gray-500">
            {request.listing?.category?.name} - {request.listing?.quantity}{" "}
            {request.listing?.unit}
          </p>

          {request.message && (
            <div className="flex gap-2 mt-3 items-start">
              <MessageSquare size={18} className="mt-1 shrink-0" />
              <p>{request.message}</p>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-gray-500">{date}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
              statusColors[request.status]
            }`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {request.status === "Pending" ? (
          <>
            <button
              onClick={onAccept}
              className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={onReject}
              className="bg-gray-200 py-3 rounded-xl hover:bg-gray-300"
            >
              Reject
            </button>
          </>
        ) : (
          <div className="col-span-2" />
        )}
        <button
          onClick={() => navigate(`/messages/${request.buyer_id}`)}
          className="border border-green-600 text-green-700 py-3 rounded-xl hover:bg-green-50 flex items-center justify-center gap-2"
        >
          <MessageSquare size={16} />
          Message
        </button>
      </div>
    </motion.div>
  );
}

export default RequestCard;

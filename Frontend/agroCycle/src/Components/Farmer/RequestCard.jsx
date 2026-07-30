import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageSquare, CheckCircle2, Truck } from "lucide-react";
import { fadeUp } from "../../lib/motion";

const statusColors = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

function RequestCard({ request, onAccept, onReject }) {
  const navigate = useNavigate();
  const date = new Date(request.created_at).toLocaleDateString();

  return (
    <motion.div
      variants={fadeUp}
      className="border border-gray-200 rounded-xl p-5"
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {request.buyer?.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {request.listing?.category?.name} - {request.listing?.quantity}{" "}
            {request.listing?.unit}
          </p>

          {request.message && (
            <div className="flex gap-2 mt-3 items-start text-sm text-gray-600">
              <MessageSquare
                size={16}
                className="mt-0.5 shrink-0 text-gray-400"
              />
              <p>{request.message}</p>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-xs">{date}</p>
          <div className="flex flex-col items-end mt-2 gap-2">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                statusColors[request.status]
              }`}
            >
              {request.status}
            </span>

            {/* Payment status */}
            {request.payment_status === "Paid" ? (
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                <CheckCircle2 size={14} />
                {request.payment_method === "card"
                  ? "Paid • Card"
                  : request.payment_method === "cod"
                    ? "Paid • Cash on Delivery"
                    : "Paid"}
              </span>
            ) : request.payment_method === "cod" ? (
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                <Truck size={14} />
                Cash on Delivery
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                Not paid
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mt-5">
        {request.status === "Pending" ? (
          <>
            <button
              onClick={onAccept}
              className="bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={onReject}
              className="bg-gray-100 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reject
            </button>
          </>
        ) : (
          <div className="col-span-2" />
        )}
        <button
          onClick={() => navigate(`/messages/${request.buyer_id}`)}
          className="border border-green-600 text-green-700 text-sm font-medium py-2 rounded-lg hover:bg-green-50 flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare size={15} />
          Message
        </button>
      </div>
    </motion.div>
  );
}

export default RequestCard;

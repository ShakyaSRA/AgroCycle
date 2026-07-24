import { MessageSquare } from "lucide-react";

function RequestCard({ buyer, waste, message, date }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{buyer}</h3>

          <p className="text-gray-500">{waste}</p>

          <div className="flex gap-2 mt-3">
            <MessageSquare size={18} />

            <p>{message}</p>
          </div>
        </div>

        <p className="text-gray-500">{date}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
          Accept
        </button>

        <button className="bg-gray-200 py-3 rounded-xl hover:bg-gray-300">
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestCard;

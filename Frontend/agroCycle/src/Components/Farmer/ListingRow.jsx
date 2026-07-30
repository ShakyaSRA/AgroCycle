import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { fadeUp } from "../../lib/motion";

const statusColors = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-yellow-50 text-yellow-700",
  Rejected: "bg-red-50 text-red-700",
  Sold: "bg-gray-100 text-gray-600",
};

function ListingRow({ listing, onEdit, onDelete }) {
  const priceLabel =
    listing.price != null
      ? `LKR ${Number(listing.price).toLocaleString()}`
      : "Free";

  return (
    <motion.tr
      variants={fadeUp}
      className="border-b border-gray-100 h-16 text-gray-600"
    >
      <td className="text-gray-900 font-medium">{listing.category?.name}</td>

      <td>
        {listing.quantity} {listing.unit}
      </td>

      <td>{priceLabel}</td>

      <td>
        <div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              statusColors[listing.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {listing.status}
          </span>
          {listing.status === "Rejected" && listing.rejection_reason ? (
            <p
              className="mt-1 text-xs text-red-600 max-w-[16rem] truncate"
              title={listing.rejection_reason}
            >
              {listing.rejection_reason}
            </p>
          ) : null}
        </div>
      </td>

      <td>
        <span className="bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs font-medium">
          {listing.buyer_requests?.length ?? 0}
        </span>
      </td>

      <td>
        <div className="flex gap-3">
          <button onClick={onEdit} title="Edit">
            <Pencil className="text-blue-600 cursor-pointer" size={16} />
          </button>
          <button onClick={onDelete} title="Delete">
            <Trash2 className="text-red-600 cursor-pointer" size={16} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default ListingRow;

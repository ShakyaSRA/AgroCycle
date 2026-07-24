import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { fadeUp } from "../../lib/motion";

const statusColors = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Sold: "bg-gray-200 text-gray-700",
};

function ListingRow({ listing, onEdit, onDelete }) {
  const priceLabel =
    listing.price != null ? `LKR ${Number(listing.price).toLocaleString()}` : "Free";

  return (
    <motion.tr variants={fadeUp} className="border-b h-20">
      <td>{listing.category?.name}</td>

      <td>
        {listing.quantity} {listing.unit}
      </td>

      <td>{priceLabel}</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            statusColors[listing.status] || "bg-gray-200 text-gray-700"
          }`}
        >
          {listing.status}
        </span>
      </td>

      <td>
        <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">
          {listing.buyer_requests?.length ?? 0}
        </span>
      </td>

      <td>
        <div className="flex gap-3">
          <button onClick={onEdit} title="Edit">
            <Pencil className="text-blue-600 cursor-pointer" size={18} />
          </button>
          <button onClick={onDelete} title="Delete">
            <Trash2 className="text-red-600 cursor-pointer" size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default ListingRow;

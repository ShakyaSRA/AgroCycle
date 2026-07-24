import { Eye, Pencil, Trash2 } from "lucide-react";

function ListingRow({ type, quantity, status, views, requests }) {
  return (
    <tr className="border-b h-20">
      <td>{type}</td>

      <td>{quantity}</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-sm
                    ${
                      status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
        >
          {status}
        </span>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Eye size={16} />

          {views}
        </div>
      </td>

      <td>
        <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">
          {requests}
        </span>
      </td>

      <td>
        <div className="flex gap-3">
          <Pencil className="text-blue-600 cursor-pointer" />

          <Trash2 className="text-red-600 cursor-pointer" />
        </div>
      </td>
    </tr>
  );
}

export default ListingRow;

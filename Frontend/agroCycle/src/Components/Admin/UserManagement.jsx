import { motion } from "framer-motion";
import { Ban, ShieldCheck, Trash } from "lucide-react";
import { staggerContainer, fadeUp } from "../../lib/motion";

function UserManagement({ users, loading, onToggleStatus, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10">
      <h2 className="text-4xl font-bold mb-8">User Management</h2>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users yet.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>User</th>
              <th>Role</th>
              <th>Listings</th>
              <th>Purchases</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {users.map((u) => (
              <motion.tr variants={fadeUp} key={u.id} className="border-t">
                <td className="py-6">
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-gray-500">{u.email}</div>
                </td>

                <td className="capitalize">{u.role}</td>

                <td>{u.listings_count}</td>

                <td>{u.purchases_count}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      u.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.is_active ? "active" : "banned"}
                  </span>
                </td>

                <td className="flex gap-4 py-6">
                  <button
                    onClick={() => onToggleStatus(u.id)}
                    title={u.is_active ? "Ban user" : "Unban user"}
                    className={u.is_active ? "text-red-500" : "text-green-600"}
                  >
                    {u.is_active ? <Ban /> : <ShieldCheck />}
                  </button>

                  <button
                    onClick={() => onDelete(u.id)}
                    title="Delete user"
                    className="text-red-600"
                  >
                    <Trash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;

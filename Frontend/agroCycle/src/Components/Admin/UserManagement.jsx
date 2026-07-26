import { useState } from "react";
import { motion } from "framer-motion";
import { Ban, ShieldCheck, Trash, Loader2 } from "lucide-react";
import { staggerContainer, fadeUp } from "../../lib/motion";

function UserManagement({ users, loading, onToggleStatus, onDelete }) {
  const [busyId, setBusyId] = useState(null);

  async function handleToggle(id) {
    setBusyId(id);
    try {
      await onToggleStatus(id);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id) {
    setBusyId(id);
    try {
      await onDelete(id);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">User Management</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-sm">No users yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
              <th>User</th>
              <th>Role</th>
              <th>Listings</th>
              <th>Purchases</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <motion.tbody variants={staggerContainer} initial="hidden" animate="show">
            {users.map((u) => {
              const isBusy = busyId === u.id;
              return (
                <motion.tr variants={fadeUp} key={u.id} className="border-t border-gray-100">
                  <td className="py-4">
                    <div className="font-medium text-gray-900">{u.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{u.email}</div>
                  </td>

                  <td className="capitalize text-gray-600">{u.role}</td>

                  <td className="text-gray-600">{u.listings_count}</td>

                  <td className="text-gray-600">{u.purchases_count}</td>

                  <td>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {u.is_active ? "active" : "banned"}
                    </span>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      onClick={() => handleToggle(u.id)}
                      disabled={isBusy}
                      title={u.is_active ? "Ban user" : "Unban user"}
                      className={`disabled:opacity-40 disabled:cursor-not-allowed ${
                        u.is_active ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {isBusy ? (
                        <Loader2 className="animate-spin" />
                      ) : u.is_active ? (
                        <Ban />
                      ) : (
                        <ShieldCheck />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      disabled={isBusy}
                      title="Delete user"
                      className="text-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isBusy ? <Loader2 className="animate-spin" /> : <Trash />}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;

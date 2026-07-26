import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import UserManagement from "../../Components/Admin/UserManagement";
import { useToast } from "../../context/ToastContext";
import { getUsers, toggleUserStatus, deleteUser } from "../../api/admin";

function AdminUsers() {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    getUsers()
      .then(setUsers)
      .catch(() => showToast("Could not load users.", "error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleToggleStatus(id) {
    try {
      await toggleUserStatus(id);
      showToast("User status updated.");
      loadData();
    } catch {
      showToast("Could not update user status.", "error");
    }
  }

  async function handleDeleteUser(id) {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await deleteUser(id);
      showToast("User deleted.");
      loadData();
    } catch {
      showToast("Could not delete user.", "error");
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          User Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage platform users, ban/unban, or remove accounts
        </p>

        <UserManagement
          users={users}
          loading={loading}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteUser}
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminUsers;

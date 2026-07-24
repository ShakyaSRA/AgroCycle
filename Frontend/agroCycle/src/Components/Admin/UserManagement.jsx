import React from "react";
import { Ban, Trash } from "lucide-react";

function UserManagement() {
  const users = [
    ["Farmer Rajesh", "rajesh@example.com", "Farmer", 5, 0],
    ["Buyer Kumar", "kumar@example.com", "Buyer", 0, 8],
    ["Green Recycling Co.", "contact@green.com", "Buyer", 0, 12],
  ];
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10">
      <h2 className="text-4xl font-bold mb-8">User Management</h2>

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

        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-t">
              <td className="py-6">
                <div className="font-semibold">{u[0]}</div>

                <div className="text-gray-500">{u[1]}</div>
              </td>

              <td>{u[2]}</td>

              <td>{u[3]}</td>

              <td>{u[4]}</td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  active
                </span>
              </td>

              <td className="flex gap-4 py-6">
                <button className="text-red-500">
                  <Ban />
                </button>

                <button className="text-red-600">
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;

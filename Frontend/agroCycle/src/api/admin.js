import client from "./client";

export function getStats() {
  return client.get("/admin/stats").then((res) => res.data);
}

export function getUsers() {
  return client.get("/admin/users").then((res) => res.data);
}

export function toggleUserStatus(id) {
  return client
    .patch(`/admin/users/${id}/toggle-status`)
    .then((res) => res.data);
}

export function deleteUser(id) {
  return client.delete(`/admin/users/${id}`).then((res) => res.data);
}

import client from "./client";

export function getReuseIdeas() {
  return client.get("/reuse-ideas").then((res) => res.data);
}

export function createReuseIdea(data) {
  return client.post("/reuse-ideas", data).then((res) => res.data);
}

export function getAdminReuseIdeas() {
  return client.get("/admin/reuse-ideas").then((res) => res.data);
}

export function updateReuseIdea(id, data) {
  return client.patch(`/admin/reuse-ideas/${id}`, data).then((res) => res.data);
}

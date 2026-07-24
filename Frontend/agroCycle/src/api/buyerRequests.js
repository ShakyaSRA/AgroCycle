import client from "./client";

export function getBuyerRequests() {
  return client.get("/buyer-requests").then((res) => res.data);
}

export function createBuyerRequest(data) {
  return client.post("/buyer-requests", data).then((res) => res.data);
}

export function updateBuyerRequest(id, status) {
  return client
    .patch(`/buyer-requests/${id}`, { status })
    .then((res) => res.data);
}

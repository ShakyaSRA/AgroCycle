import client from "./client";

export async function getBuyerRequest(id) {
  // Backend does not provide a GET for a single buyer request.
  // Fetch the list and return the matching item.
  const response = await client.get(`/buyer-requests`);
  const item = response.data?.find((r) => String(r.id) === String(id));
  if (!item) {
    const err = new Error("Request not found");
    err.response = { status: 404, data: { message: "Request not found" } };
    throw err;
  }
  return item;
}

export async function getBuyerRequests() {
  const response = await client.get(`/buyer-requests`);
  return response.data;
}

export function createBuyerRequest(data) {
  return client.post("/buyer-requests", data).then((res) => res.data);
}

export function updateBuyerRequest(id, status) {
  return client
    .patch(`/buyer-requests/${id}`, { status })
    .then((res) => res.data);
}

export function payForRequest(id, data) {
  return client
    .patch(`/buyer-requests/${id}/pay`, data)
    .then((res) => res.data);
}

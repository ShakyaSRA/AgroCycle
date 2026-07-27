import client from "./client";

export function getFarmerRatings(farmerId) {
  return client.get(`/farmers/${farmerId}/ratings`).then((res) => res.data);
}

export function rateFarmer(farmerId, data) {
  return client.post(`/farmers/${farmerId}/ratings`, data).then((res) => res.data);
}

import client from "./client";

export function getListings(params = {}) {
  return client.get("/waste-listings", { params }).then((res) => res.data);
}

export function getMyListings() {
  return client.get("/my-listings").then((res) => res.data);
}

export function getListing(id) {
  return client.get(`/waste-listings/${id}`).then((res) => res.data);
}

export function createListing(formData) {
  return client
    .post("/waste-listings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function updateListing(id, formData) {
  formData.append("_method", "PUT");
  return client
    .post(`/waste-listings/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function updateListingStatus(id, status, rejection_reason = null) {
  return client
    .put(`/waste-listings/${id}`, { status, rejection_reason })
    .then((res) => res.data);
}

export function deleteListing(id) {
  return client.delete(`/waste-listings/${id}`).then((res) => res.data);
}

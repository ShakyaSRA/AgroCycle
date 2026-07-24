import client from "./client";

export function getCategories() {
  return client.get("/categories").then((res) => res.data);
}

export function createCategory(data) {
  return client.post("/admin/categories", data).then((res) => res.data);
}

export function getCategoryRequests() {
  return client.get("/category-requests").then((res) => res.data);
}

export function createCategoryRequest(data) {
  return client.post("/category-requests", data).then((res) => res.data);
}

export function updateCategoryRequest(id, data) {
  return client
    .patch(`/admin/category-requests/${id}`, data)
    .then((res) => res.data);
}

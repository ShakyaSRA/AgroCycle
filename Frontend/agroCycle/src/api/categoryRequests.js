import client from "./client";

export async function createCategoryRequest(data) {
  const response = await client.post("/category-requests", data);
  return response.data;
}
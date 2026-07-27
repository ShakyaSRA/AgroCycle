import client, { ensureCsrfCookie } from "./client";

export async function register(data) {
  await ensureCsrfCookie();
  return client.post("/register", data).then((res) => res.data);
}

export async function login(data) {
  await ensureCsrfCookie();
  return client.post("/login", data).then((res) => res.data);
}

export function logout() {
  return client.post("/logout").then((res) => res.data);
}

export function me() {
  return client.get("/me").then((res) => res.data);
}

export function updateProfile(data) {
  return client.put("/me", data).then((res) => res.data);
}

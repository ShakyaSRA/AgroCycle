import client from "./client";

export function register(data) {
  return client.post("/register", data).then((res) => res.data);
}

export function login(data) {
  return client.post("/login", data).then((res) => res.data);
}

export function logout() {
  return client.post("/logout").then((res) => res.data);
}

export function me() {
  return client.get("/me").then((res) => res.data);
}

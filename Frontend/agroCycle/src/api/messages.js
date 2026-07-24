import client from "./client";

export function getConversations() {
  return client.get("/conversations").then((res) => res.data);
}

export function getThread(userId) {
  return client.get(`/messages/${userId}`).then((res) => res.data);
}

export function sendMessage(data) {
  return client.post("/messages", data).then((res) => res.data);
}

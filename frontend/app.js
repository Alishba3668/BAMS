const API = "http://localhost:5000/api";

async function apiGet(url) {
  return fetch(API + url).then(res => res.json());
}

async function apiPost(url, body) {
  return fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(res => res.json());
}

async function apiPut(url, body) {
  return fetch(API + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(res => res.json());
}

async function apiDelete(url) {
  return fetch(API + url, { method: "DELETE" }).then(res => res.json());
}

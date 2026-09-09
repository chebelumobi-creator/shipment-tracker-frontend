
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function fetchShipment(trackingNumber) {
  const res = await fetch(
    `${API_BASE}/track/${encodeURIComponent(trackingNumber.trim())}/`
  );

  if (res.status === 404) {
    throw new Error("NOT_FOUND");
  }
  if (!res.ok) {
    throw new Error("SERVER_ERROR");
  }
  return res.json();
}
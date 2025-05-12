import { getToken } from "@/stores/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

export async function deleteVenueFetch(id: string): Promise<void> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY!,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/venues/${id}`, {
    method: "DELETE",
    headers,
  });

  if (response.status !== 204) {
    const message = await response.text();
    throw new Error(`Delete venue failed: ${response.status}: ${message}`);
  }
}

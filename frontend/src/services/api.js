const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const getToken = () => localStorage.getItem('sp_erp_token');
export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'API request failed');
  return json.data;
}
export const apiBase = API_BASE;

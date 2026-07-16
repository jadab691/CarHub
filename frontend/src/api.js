const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3006";

export const apiUrl = (path = "") => `${API_BASE_URL}${path}`;
export const imageUrl = (filename) =>
  filename ? `${API_BASE_URL}/uploads/${filename}` : "";

export default API_BASE_URL;

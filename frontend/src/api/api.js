import axios from "axios";

const BASE_URL = "http://localhost:5600";

const api = axios.create({
  baseURL: `${BASE_URL}/api`
});

// 🔐 ALWAYS ATTACH TOKEN (MOVE HERE BEFORE EXPORT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* AUTH APIs */
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

/* PLACE APIs */
export const getPlaces = () => api.get("/places");
export const getPlaceById = (id) => api.get(`/places/${id}`);
export const deletePlace = (id) => api.delete(`/places/${id}`);

export const createPlace = (formdata) =>
  api.post("/places", formdata, {
    headers: { "Content-Type": "multipart/form-data" }
  });

/* PAYMENT APIs */
export const createOrder = (data) =>
  api.post("/payments/create-order", data);

export const verifyPayment = (data) =>
  api.post("/payments/verify", data);

/* AI CHAT */
export const sendChatMessage = (data) =>
  api.post("/chat", data);

export default api;
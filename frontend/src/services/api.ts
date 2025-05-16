import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const createPost = async (data: { title: string; content: string }) => {
  const response = await api.post("/posts", data);
  return response.data;
};

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getCommentsByPost = async (postId: string) => {
  const response = await api.get("/comments", { params: { postId } });
  return response.data;
};

export default api;

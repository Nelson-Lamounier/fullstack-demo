import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface GoogleSignInResponse {
  token: string;
  user: {
    uid: string;
    email: string;
    username: string;
  };
}

export interface SignUpPayload {
    username: string;
    email: string;
    password: string;
    receiveEmails: boolean;
}

// API for sign-in
export const signInApi = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/signin", payload);
  return response.data;
};

// API for Google Sign-In
export const googleSignInApi = async (
  token: string
): Promise<GoogleSignInResponse> => {
  const response = await api.post("/api/auth/google/login", { token });
  return response.data;
};

// API for sign-out
export const signOutApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  }
  const response = await api.post(
    "/api/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// API for Sing-Up

export const signUpApi = async (payload: SignUpPayload) => {
  const response = await api.post("/api/auth/signup", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getCurrentUser = async (): Promise<any> => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      throw new Error("No token found");
    }
  
    const response = await api.get("/api/auth/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data.user; // Assuming `user` is returned from the backend
  };

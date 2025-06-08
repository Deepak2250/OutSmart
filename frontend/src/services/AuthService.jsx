const BASE_URL = "http://localhost:8080";
import { saveToken } from "../utils/Auth";

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const token = res.headers.get("Authorization")?.replace("Bearer ", "");
  let data;

  try {
    data = await res.json(); // try to parse JSON if present
  } catch (e) {
    data = {};
  }

  if (!res.ok || !token) {
    throw new Error(data.message || "Login failed");
  }

  saveToken(token);
  return data;
};

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const token = res.headers.get("Authorization")?.replace("Bearer ", "");
  let data;

  try {
    data = await res.json();
  } catch (e) {
    data = {};
  }

  if (!res.ok || !token) {
    throw new Error(data.message || "Registration failed");
  }

  saveToken(token);
  return data;
};

export const requestOTP = async (email) => {
  const res = await fetch(`${BASE_URL}/api/user/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to send OTP");
  }

  return true;
};

export const verifyOTPAndResetPassword = async (email, otp, newPassword) => {
  const res = await fetch(`${BASE_URL}/api/user/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to verify OTP");
  }

  return true;
};

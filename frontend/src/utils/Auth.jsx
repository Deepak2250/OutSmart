export const saveToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const expiry = decoded.exp * 1000;
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("jwt_expiry", expiry.toString());
  } catch (e) {
    console.error("Failed to decode and save JWT token", e);
  }
};
export const getToken = () => {
  const token = localStorage.getItem("jwt_token");
  const expiry = localStorage.getItem("jwt_expiry");

  if (!token || !expiry) return { token: null, expiry: null };

  return { token, expiry: Number(expiry) };
};

export const clearToken = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("jwt_expiry");
};

export const isTokenExpired = () => {
  const { expiry } = getToken();
  if (!expiry) return true;
  return Date.now() > expiry;
};

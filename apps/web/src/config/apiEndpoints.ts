const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const APIEndpoints = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    ME: `${BASE_URL}/auth/me`,
  },
};

export default APIEndpoints;

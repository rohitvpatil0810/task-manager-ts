const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const APIEndpoints = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    GOOGLE_SIGNIN: `${BASE_URL}/auth/google`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    ME: `${BASE_URL}/auth/me`,
  },
  TASK: {
    CREATE: `${BASE_URL}/tasks`,
    GET: `${BASE_URL}/tasks`,
    GET_ONE: (id: string) => `${BASE_URL}/tasks/${id}`,
    UPDATE: (id: string) => `${BASE_URL}/tasks/${id}`,
    DELETE: (id: string) => `${BASE_URL}/tasks/${id}`,
    CHANGE_STATUS: (id: string) => `${BASE_URL}/tasks/${id}/change-status`,
  },
};

export default APIEndpoints;

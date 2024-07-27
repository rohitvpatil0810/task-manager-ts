import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.statusCode === 10003) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;

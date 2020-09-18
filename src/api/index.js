import axios from 'axios';

export default function setup(t) {
  axios.defaults.baseURL = 'http://localhost:8080';
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 401) && error.request.responseURL.indexOf('api/auth/login') === -1) {
        document.location = "/logout";
        localStorage.setItem("token", "");

        return Promise.resolve({});
      }

      return Promise.reject({
        error: 'error',
        message: error.response.data.message,
      });
    },
  );

  let token = t || localStorage.getItem("token");

  if (token !== 'null' && token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

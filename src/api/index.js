import axios from 'axios';

export default function setup(t) {
  axios.defaults.baseURL = 'https://api.spintegra.sk';
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
        status: error.response.status,
        message: error && error.response ? error.response.data.message : 'Error',
      });
    },
  );

  let token = t || localStorage.getItem("token");

  if (token !== 'null' && token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

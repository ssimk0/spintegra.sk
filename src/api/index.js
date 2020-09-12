import axios from 'axios';

export default function setup() {
  axios.defaults.baseURL = 'https://api.veselahviezdicka.sk';
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403) && error.request.responseURL.indexOf('api/auth/login') === -1) {
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

  // before a request is made start the nprogress
  axios.interceptors.request.use((config) => {
    return config;
  });

  let token = localStorage.getItem("token");

  if (token !== 'null' && token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

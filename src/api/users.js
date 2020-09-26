import axios from 'axios';


export default {
    login(args) {
        return axios.post(`/api/v1/auth/login`, args).then((response) => response.data);
    },
    info() {
        return axios.get(`/api/v1/auth/user`).then((response) => response.data);
    },
    forgotPassword(email) {
        return axios.post(`/api/v1/auth/forgot-password`, {email});
    },
    resetPassword(data, token) {
        return axios.post(`/api/v1/auth/reset-password/${token}`, data);
    }
}

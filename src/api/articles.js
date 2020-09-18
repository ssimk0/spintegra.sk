import axios from 'axios';


export default {
    create(args) {
        return axios.post(`/api/v1/articles`, args).then((reponse) => reponse.data)
    },
    edit(args) {
        return axios.put(`/api/v1/articles/${args.id}`, args).then((reponse) => reponse.data)
    },
    detail(args) {
        return axios.get(`/api/v1/articles/${args.slug}`).then((response) => response.data);
    },
    list(args) {
        return axios.get(`/api/v1/articles`, {
            params: args
        }).then((response) => response.data);
    }
}

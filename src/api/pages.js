import axios from 'axios';

export default {
    detail(slug, category) {
        return axios.get(`/api/v1/pages/${category}/${slug}`).then((r) => r.data)
    },
    byCategorySlug(category) {
        return axios.get(`/api/v1/pages/${category}`).then((r) => r.data);
    }
}

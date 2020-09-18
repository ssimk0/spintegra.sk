import axios from 'axios';

export default {
    detail(slug, category) {
        return axios.get(`/api/v1/pages/${category}/${slug}`).then((r) => r.data)
    },
    byCategorySlug(category) {
        return axios.get(`/api/v1/pages/${category}`).then((r) => r.data);
    },
    editPage(category, page) {
        return axios.put(`/api/v1/pages/${page.id}`, {
            title: page.title,
            body: page.body
        })
    }
}

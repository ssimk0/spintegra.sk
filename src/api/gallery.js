import axios from 'axios';

export const GALLERY_TYPE = 'gallery';
export const PAGES_TYPE = 'pages';

export default {
    list(type) {
        return axios.get(`/api/v1/uploads/${type}`).then((r) => r.data);
    },
    listUploads(args) {
        const {type, category} = args;
        return axios.get(`/api/v1/uploads/${type}/${category}`).then(r => r.data);
    },
    createCategory(args) {
        const {name, subPath, description, type} = args;

        return axios.post(`/api/v1/uploads/${type}`, {
            name,
            description,
            subPath,
        });
    },
    upload(data, category) {
        return axios.post(`/api/v1/uploads/${PAGES_TYPE}/${category}`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
            return {
                data: {
                    link: response.data ? response.data.file : null,
                },
                ...response.data
            };
        });
    }
};

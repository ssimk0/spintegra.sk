import axios from 'axios';

export function uploadImage(blob) {
    const data = new FormData();
    data.append('file', blob)

    return axios.post('/api/v1/uploads/pages/media', data).then((response) => {
        return {
            data: {
                link: response.data ? response.data.file : null,
            },
            ...response
        };
    });
}

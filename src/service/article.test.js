import axios from 'axios';

import ArticleService from "./article";

jest.mock('axios');


it('should allow only params for create', async () => {
    axios.post.mockImplementationOnce((url, data) => {
        return Promise.resolve({
            data: {...data, url}
        });
    })

    const response = await ArticleService.create({
        body: 'test',
        title: 'title',
        short: 'short',
        published: true,
        notValid: 'not valid'
    });



    expect(response.body).toEqual('test')
    expect(response.notValid).toBeUndefined()
    expect(response.url).toEqual('/api/v1/articles')
})

it('should allow only params for edit', async () => {
    axios.put.mockImplementationOnce((url, data) => {
        return Promise.resolve({
            data: {...data, url}
        });
    })

    const response = await ArticleService.edit({
        body: 'test',
        title: 'title',
        short: 'short',
        published: true,
        notValid: 'not valid',
        id: 1
    });



    expect(response.body).toEqual('test')
    expect(response.notValid).toBeUndefined()
    expect(response.url).toEqual('/api/v1/articles/1')
})

it('should call get articles with default page when is not defined', async () => {
    axios.get.mockImplementationOnce((url, params) => {
        return Promise.resolve({
            data: {...params, url}
        });
    })

    const response = await ArticleService.getArticles();


    expect(response.params.p).toEqual(1)
    expect(response.url).toEqual('/api/v1/articles')
})

it('should call get article by slug', async () => {
    axios.get.mockImplementationOnce((url, params) => {
        return Promise.resolve({
            data: {...params, url}
        });
    })

    const response = await ArticleService.getArticle('test');

    expect(response.url).toEqual('/api/v1/articles/test')
})



it('should allow only page for getArticle', async () => {
    axios.get.mockImplementationOnce((url, params) => {
        return Promise.resolve({
            data: {...params, url}
        });
    })

    const response = await ArticleService.getArticles({
        notValid: 'test',
        p: 5
    });


    expect(response.params.p).toEqual(5)
    expect(response.params.notValid).toBeUndefined()
    expect(response.url).toEqual('/api/v1/articles')
})

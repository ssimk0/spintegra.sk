import axios from 'axios';

import UserService from "./user";

jest.mock('axios');


it('should call correct url when userInfo is called', async () => {
    axios.get.mockImplementationOnce((url) => {
        return Promise.resolve({
            data: {url}
        });
    })

    const response = await UserService.userInfo();

    expect(response.url).toEqual('/api/v1/auth/user')
})


it('should parse correct params for login', async () => {
    axios.post.mockImplementationOnce((url, data) => {
        return Promise.resolve({
            data: {url, ...data}
        });
    })

    const response = await UserService.login({
        email: 'test@test.com',
        password: 'test',
        notValid: 'not valid'
    });

    expect(response.email).toEqual('test@test.com')
    expect(response.password).toEqual('test')
    expect(response.notValid).toBeUndefined()
    expect(response.url).toEqual('/api/v1/auth/login')
})

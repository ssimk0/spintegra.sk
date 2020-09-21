import axios from 'axios';

import PageService from "./page";

jest.mock('axios');


it('should correct build url when getPage is called', async () => {
    axios.get.mockImplementationOnce((url) => {
        return Promise.resolve({
            data: {url}
        });
    })

    const response = await PageService.getPage("test", "menu");

    expect(response.url).toEqual('/api/v1/pages/menu/test')
})

it('should correct build url when getPagesByCategory is called', async () => {
    axios.get.mockImplementationOnce((url) => {
        return Promise.resolve({
            data: {url}
        });
    })

    const response = await PageService.getPagesByCategory("menu");

    expect(response.url).toEqual('/api/v1/pages/menu')
})

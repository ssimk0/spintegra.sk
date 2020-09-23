import React from 'react';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';
import Articles from './Articles';
import * as AppContext from '../../context/app';
import {MemoryRouter} from "react-router-dom";


const defaultContext = {
    state: {},
    dispatch: () => {
        return {}
    }
}

async function renderComponent(context = defaultContext) {
    let wrapper = null;

    const mockGetNews = jest.fn(() => Promise.resolve([]))

    const testService = {
        getArticles: mockGetNews
    }

    jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => context);


    await act(async () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[`/articles`]}>
                <Articles articleService={testService}/>
            </MemoryRouter>
        );
    })

    return {wrapper, mockGetNews};
}


test('should call dispatch set page title with static text', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(true);

    await renderComponent({
        state: {},
        dispatch: mockFn
    });

    expect(mockFn.mock.calls).toEqual([[{"type": "SET_PAGE_TITLE", "value": "Aktuality"}]]);
});

test('should call service', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(true);

    const {mockGetNews} = await renderComponent({
        state: {},
        dispatch: mockFn
    });

    expect(mockGetNews.mock.calls.length).toEqual(1);
});

test('should display a loader on start', async () => {
    let {wrapper} = await renderComponent();

    let loader = wrapper.find('.loader')

    expect(loader.exists()).toBeTruthy();
    wrapper.update()

    loader = wrapper.find('.loader')
    expect(loader.exists()).toBeFalsy();
});

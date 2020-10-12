import React from 'react';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';
import Page from './Page';
import * as AppContext from '../../context/app';


const testService = {
    pages: {
        test: {
            title: "test",
            slug: "test",
            body: "<h2>test body</h2>"
        },
        new: {
            title: "new awesome page",
            slug: "new",
            body: "<h4>New awesome page body</h4>"
        }
    },
    getPage(slug, category) {
        const page = this.pages[slug] || {};
        page.category = category
        return Promise.resolve(page);
    }
}
const defaultContext = {
    state: {},
    dispatch: () => {
        return {}
    }
}

async function renderComponent(slug = "test", context = defaultContext, service = testService) {
    let wrapper = null;


    jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => context);


    await act(async () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[`/page/menu/${slug}`]}>
                <Switch>
                    <Route path="/page/:category/:parent_slug">
                        <Page pageService={service}/>
                    </Route>
                </Switch>
            </MemoryRouter>
        );
    })

    return wrapper;
}

test('should call getPage on service', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(Promise.resolve({
        title: "test",
        slug: "test",
        body: "<h2>test body</h2>"
    }));

    await renderComponent("test", defaultContext, {
        getPage: mockFn
    });

    expect(mockFn.mock.calls).toEqual([["test", "menu"]]);
});


test('should call dispatch set page title with slug', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(true);

    await renderComponent("test", {
        state: {},
        dispatch: mockFn
    });

    expect(mockFn.mock.calls).toEqual([[{"type": "SET_PAGE_TITLE", "value": "test"}]]);
});

test('should display a loader on start', async () => {
    let wrapper = await renderComponent("test");

    let loader = wrapper.find('.loader')

    expect(loader.exists()).toBeTruthy();
    wrapper.update() // update will update the component and recieve the page

    loader = wrapper.find('.loader')
    expect(loader.exists()).toBeFalsy();
});

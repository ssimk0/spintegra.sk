import * as AppContext from "./context/app";
import {act} from "react-dom/test-utils";
import {mount} from "enzyme";
import React from "react";
import App from "./App";

const testService = {
    pages: [
        {
            id: 1,
            title: "test",
            slug: "test",
            body: "<h2>test body</h2>"
        },
        {
            id: 2,
            title: "new awesome page",
            slug: "new",
            body: "<h4>New awesome page body</h4>"
        }
    ],
    getPagesByCategory(category) {
        return Promise.resolve(this.pages);
    }
}

const defaultContext = {
    state: {
        menuItems: [],
    },
    dispatch: () => {
        return {}
    }

}

async function renderComponent(context = defaultContext, service = testService) {
    let wrapper = null;


    jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => context);

    const userService = {
        userInfo() {
            return Promise.resolve({
                id: 1,
            })
        }
    }

    await act(async () => {
        wrapper = mount(
            <App pageService={service} userService={userService}/>
        );
    })

    return wrapper;
}

test('should call getPagesByCategory on service', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(Promise.resolve({}));

    await renderComponent(defaultContext, {
        getPagesByCategory: mockFn
    });

    expect(mockFn.mock.calls).toEqual([["menu"]]);
});

test('should call dispatch set menu items to context', async () => {
    const mockFn = jest.fn();

    await renderComponent({
        state: {
            menuItems: []
        },
        dispatch: mockFn
    });

    expect(mockFn.mock.calls).toEqual([
        [{"type": "SET_MENU_ITEMS", "value": testService.pages}],
        [{"type": "SET_PAGE_TITLE", "value": "Domov"}]
    ]);
});


test('should display menuItems in menu', async () => {
    const mockFn = jest.fn();

    let wrapper = await renderComponent({
        state: {
            menuItems: testService.pages,
            title: 'Domov'
        },
        dispatch: mockFn
    });

    wrapper.update();

    let first_link = wrapper.find('[href="/pages/menu/test"]')
    let second_link = wrapper.find('[href="/pages/menu/new"]')

    expect(first_link.exists()).toBeTruthy();
    expect(second_link.exists()).toBeTruthy();
});

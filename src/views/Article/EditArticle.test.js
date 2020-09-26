import * as AppContext from "../../context/app";
import {act} from "react-dom/test-utils";
import {mount} from "enzyme";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import EditArticle from "./EditArticle";
import React from "react";
import * as Form from "react-hook-form";


const testService = {
    articles: {
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
    getArticle(slug) {
        const article = this.articles[slug] || {};
        return Promise.resolve(article);
    }
}
const defaultContext = {
    dispatch: () => {
        return {}
    }
}

async function renderComponent(slug = "test", context = defaultContext, service=testService) {
    let wrapper = null;

    jest
        .spyOn(Form, 'useForm')
        .mockImplementation(() => {
            return {
                handleSubmit: (fn) => null,
                register: (params) => null,
                errors: (err) => null
            }
        });

    jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => context);


    await act(async () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[`/page/menu/${slug}/edit`]}>
                <Switch>
                    <Route path="/page/:category/:slug/edit">
                        <EditArticle articleService={service}/>
                    </Route>
                </Switch>
            </MemoryRouter>
        );
    })

    return wrapper;
}

test('should call getPage on service', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(Promise.resolve({}));

    await renderComponent("test", defaultContext, {
        getArticle: mockFn
    });

    expect(mockFn.mock.calls).toEqual([["test"]]);
});


test('should call dispatch set page title with slug', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(true);

    await renderComponent("test", {
        dispatch: mockFn
    });

    expect(mockFn.mock.calls).toEqual([[{"type": "SET_PAGE_TITLE", "value": "Upraviť článok: test"}]]);
});

test('should display a loader on start', async () => {
    let wrapper = await renderComponent("new");

    let loader = wrapper.find('.loader')

    expect(loader.exists()).toBeTruthy();
    wrapper.update() // update will update the component and recieve the edit page

    loader = wrapper.find('.loader')
    expect(loader.exists()).toBeFalsy();
});

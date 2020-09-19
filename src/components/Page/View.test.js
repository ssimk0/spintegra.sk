import React from 'react';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';
import Page from './View';

const testPage = {
    title: "test",
    slug: "test",
    body: "<h2>test body</h2>"
}

async function renderComponent(page = testPage) {
    let wrapper = null;
    await act(async () => {
        // Mount is use because of dangerouslySetInnerHTML should render correctly
        wrapper = mount(
            <Page page={page}/>
        );
    })

    return wrapper;
}

test('renders page component with container of id page', async () => {
    let wrapper = await renderComponent();
    const pageWrapper = wrapper.find('#page');
    expect(pageWrapper.exists).toBeTruthy();
});

test('renders page title correctly', async () => {
    let wrapper = await renderComponent();

    const title = wrapper.find('.title');
    expect(title.text()).toEqual("test");
});


test('renders page title correctly for different slug', async () => {
    let wrapper = await renderComponent({
        title: "new awesome page",
        slug: "test",
        body: "<h2>test body</h2>"
    });

    const title = wrapper.find('.title');
    expect(title.text()).toEqual("new awesome page");
});

test('renders page body correctly', async () => {
    let wrapper = await renderComponent();

    const content = wrapper.find('.content');
    expect(content.text()).toEqual("test body");
});

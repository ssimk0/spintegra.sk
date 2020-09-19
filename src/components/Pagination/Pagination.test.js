import React from 'react';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';
import Pagination from './Pagination';

async function renderComponent(page = 1, total= 10) {
    let wrapper = null;
    await act(async () => {
        // Mount is use because of dangerouslySetInnerHTML should render correctly
        wrapper = mount(
            <Pagination page={page} total_pages={total}/>
        );
    })

    return wrapper;
}

test('should render only next button on first page', async () => {
    let wrapper = await renderComponent(1, 2);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeTruthy();
    expect(prevButton.exists()).toBeFalsy();
    expect(hr.exists()).toBeTruthy();
});

test('should render only prev button on last page', async () => {
    let wrapper = await renderComponent(2, 2);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeFalsy();
    expect(prevButton.exists()).toBeTruthy();
    expect(hr.exists()).toBeTruthy();
});


test('should render prev and next button if is not last or first page', async () => {
    let wrapper = await renderComponent(2, 3);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeTruthy();
    expect(prevButton.exists()).toBeTruthy();
    expect(hr.exists()).toBeTruthy();
});


test('should doesn\'t render buttons or hr', async () => {
    let wrapper = await renderComponent(1, 1);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeFalsy();
    expect(prevButton.exists()).toBeFalsy();
    expect(hr.exists()).toBeFalsy();
});

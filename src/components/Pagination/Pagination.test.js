import React from 'react';
import {act} from 'react-dom/test-utils';
import Pagination from './Pagination';

import renderWithRouter from "../../setupTests";


async function renderComponent(page = 1, total = 10) {
    let wrapper = null;
    let history = null;


    await act(async () => {
        // Mount is use because of dangerouslySetInnerHTML should render correctly
        const result = renderWithRouter(<Pagination page={page} total_pages={total}/>);

        wrapper = result.wrapper
        history = result.history
    })

    return {wrapper, history};
}

test('should render only next button on first page', async () => {
    let {wrapper} = await renderComponent(1, 2);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeTruthy();
    expect(prevButton.exists()).toBeFalsy();
    expect(hr.exists()).toBeTruthy();
});

test('should render only prev button on last page', async () => {
    let {wrapper} = await renderComponent(2, 2);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeFalsy();
    expect(prevButton.exists()).toBeTruthy();
    expect(hr.exists()).toBeTruthy();
});


test('should render prev and next button if is not last or first page', async () => {
    let {wrapper} = await renderComponent(2, 3);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeTruthy();
    expect(prevButton.exists()).toBeTruthy();
    expect(hr.exists()).toBeTruthy();
});


test('should doesn\'t render buttons or hr', async () => {
    let {wrapper} = await renderComponent(1, 1);
    const nextButton = wrapper.find('.next');
    const prevButton = wrapper.find('.prev');
    const hr = wrapper.find('hr');

    expect(nextButton.exists()).toBeFalsy();
    expect(prevButton.exists()).toBeFalsy();
    expect(hr.exists()).toBeFalsy();
});

test('should change location to page 3 when click next', async () => {

    let {wrapper, history} = await renderComponent(2, 3);


    const nextButton = wrapper.find('.next');

    expect(history.location.search).toEqual("");

    await act(async () => {
        nextButton.simulate('click')
    })

    expect(history.location.search).toEqual("?page=3");
});


test('should change location to page 1 when click prev', async () => {

    let {wrapper, history} = await renderComponent(2, 3);


    const nextButton = wrapper.find('.prev');

    expect(history.location.search).toEqual("");

    await act(async () => {
        nextButton.simulate('click')
    })

    expect(history.location.search).toEqual("?page=1");
});

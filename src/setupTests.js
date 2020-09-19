// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';
import {createMemoryHistory} from 'history'
import {Router} from "react-router-dom";
import React from "react";

configure({adapter: new Adapter()});


function renderWithRouter(
    ui,
    {
        route = '/',
        history = createMemoryHistory({initialEntries: [route]}),
    } = {}
) {
    return {
        wrapper: mount(<Router history={history}>{ui}</Router>),
        history,
    }
}

export default renderWithRouter

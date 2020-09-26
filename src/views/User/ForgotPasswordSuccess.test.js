import * as AppContext from "../../context/app";
import {act} from "react-dom/test-utils";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import React from "react";

const defaultContext = {
    dispatch: () => {
        return {}
    }
}

async function renderComponent(context = defaultContext) {
    let wrapper = null;


    jest
        .spyOn(AppContext, 'useAppContext')
        .mockImplementation(() => context);


    await act(async () => {
        wrapper = mount(
            <MemoryRouter>
                <ForgotPasswordSuccess />
            </MemoryRouter>
        );
    })

    return wrapper;
}


test('should call dispatch forgot password success title with correct test', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(true);

    await renderComponent({
        dispatch: mockFn
    });

    expect(mockFn.mock.calls).toEqual([[{"type": "SET_PAGE_TITLE", "value": "Zabudnuté heslo"}]]);
});


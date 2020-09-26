import * as AppContext from "../../context/app";
import {act} from "react-dom/test-utils";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import React from "react";
import * as Form from "react-hook-form";


const testService = {}
const defaultContext = {
    dispatch: () => {
        return {}
    }
}

async function renderComponent(context = defaultContext, service = testService) {
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
            <MemoryRouter>
                <ForgotPassword userService={service}/>
            </MemoryRouter>
        );
    })

    return wrapper;
}


test('should call dispatch forgot password title with correct test', async () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(true);

    await renderComponent({
        dispatch: mockFn
    });

    expect(mockFn.mock.calls).toEqual([[{"type": "SET_PAGE_TITLE", "value": "Zabudnuté heslo"}]]);
});


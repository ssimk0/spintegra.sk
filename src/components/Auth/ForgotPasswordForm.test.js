import * as React from 'react';
import {mount} from 'enzyme';
import ForgotPasswordForm from "./ForgotPasswordForm";
import {act} from "react-dom/test-utils";
import {MemoryRouter} from "react-router-dom";

describe('Forgot password form test', () => {
    let wrapper
    let mockForgotPassword


    beforeEach(() => {
        mockForgotPassword = jest.fn();

        mockForgotPassword.mockReturnValueOnce(Promise.resolve())

        jest.spyOn(React, "useEffect").mockImplementation(f => f());

        const testService = {
            forgotPassword: mockForgotPassword,
        }


        wrapper = mount(
            <MemoryRouter>
                <ForgotPasswordForm userService={testService}/>
            </MemoryRouter>
        )
    })

    test('should send email to mock after submit form', async () => {
        const email = wrapper.find("input[name='email']")
        const button = wrapper.find("button[type='submit']")

        email.instance().value = 'test@test.com'

        await act(async () => {
            button.simulate('submit')
        })

        expect(mockForgotPassword.mock.calls).toEqual([
            ["test@test.com"]
        ]);
    })
})

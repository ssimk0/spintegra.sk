import * as React from 'react';
import {mount} from 'enzyme';
import ResetPasswordForm from "./ResetPasswordForm";
import {act} from "react-dom/test-utils";
import {MemoryRouter} from "react-router-dom";

describe('Reset password form test', () => {
    let wrapper
    let mockForgotPassword


    beforeEach(() => {
        mockForgotPassword = jest.fn();

        mockForgotPassword.mockReturnValueOnce(Promise.resolve())

        jest.spyOn(React, "useEffect").mockImplementation(f => f());

        const testService = {
            resetPassword: mockForgotPassword,
        }


        wrapper = mount(
            <MemoryRouter initialEntries={['/reset-password?token=123']}>
                <ResetPasswordForm userService={testService}/>
            </MemoryRouter>
        )
    })

    test('should send passwords to mock after submit form', async () => {
        const password = wrapper.find("input[name='password']")
        const confirm = wrapper.find("input[name='confirm']")
        const button = wrapper.find("button[type='submit']")

        password.instance().value = 'test123';
        confirm.instance().value = 'test123';

        await act(async () => {
            button.simulate('submit')
        })

        expect(mockForgotPassword.mock.calls).toEqual([
            [{
                "confirm": "test123",
                "password": "test123",
                "token": "123"
            }]
        ]);
    })
})

import * as React from 'react';
import {mount} from 'enzyme';
import * as AppContext from '../../context/app';
import * as Form from 'react-hook-form';
import LoginForm from "./LoginForm";
import axios from "axios";

describe('Login form test', () => {
    let wrapper
    let mockDispatch


    beforeEach(() => {
        mockDispatch = jest.fn();
        const context = {
            state: {
                token: null,
            },
            dispatch: mockDispatch
        }

        jest
            .spyOn(Form, 'useForm')
            .mockImplementation(() => {
                return {
                    handleSubmit: (fn) => fn(),
                    register: (params) => null,
                    errors: (err) => null
                }
            });

        jest
            .spyOn(AppContext, 'useAppContext')
            .mockImplementation(() => context);


        jest.spyOn(React, "useEffect").mockImplementation(f => f());

        const testService = {
            login: () => Promise.resolve({token: "token"}),
            userInfo: () => Promise.resolve({
                "name": "test"
            })
        }


        wrapper = mount(
            <LoginForm userService={testService}/>
        )
    })

    test('should dispatch token and user info after submit form', () => {
        const email = wrapper.find("input[name='email']")
        const password = wrapper.find("input[name='password']")
        const button = wrapper.find("button[type='submit']")

        email.simulate('change', {target: {value: 'test@test.com'}})
        password.simulate('change', {target: {value: 'test1234'}})

        button.simulate('click')

        expect(mockDispatch.mock.calls).toEqual([
            [{
                "type": "SET_USER_INFO",
                "value": {
                    "name": "test"
                },
            }], [{
                "type": "SET_TOKEN",
                "value": "token",
            }]
        ]);

        expect(axios.defaults.headers.common.Authorization).toEqual('Bearer token')
    })
})

import * as React from 'react';
import {mount} from 'enzyme';
import * as AppContext from '../../context/app';
import LoginForm from "./LoginForm";
import axios from "axios";
import {act} from "react-dom/test-utils";
import {MemoryRouter} from "react-router-dom";

describe('User form test', () => {
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
            <MemoryRouter>
                <LoginForm userService={testService}/>
            </MemoryRouter>
        )
    })

    test('should dispatch token and user info after submit form', async () => {
        const email = wrapper.find("input[name='email']")
        const password = wrapper.find("input[name='password']")
        const button = wrapper.find("button[type='submit']")

        email.instance().value = 'test@test.com'
        password.instance().value = 'test1234'

        await act(async () => {
            button.simulate('submit')
        })

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

import * as React from 'react';
import {shallow} from 'enzyme';
import * as AppContext from '../../context/app';
import Login from "./Login";

describe('User page test', () => {
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


        shallow(
            <Login/>
        )

    })

    test('should set correct page title', () => {

        expect(mockDispatch.mock.calls).toEqual([
            [{
                "type": "SET_PAGE_TITLE",
                "value": "Prihlásenie",
            }]
        ]);
    })
})

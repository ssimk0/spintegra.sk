import * as React from 'react';
import {mount} from 'enzyme';
import PageForm from "./PageForm";
import {act} from "react-dom/test-utils";

describe('Login form test', () => {
    let wrapper
    let mockSubmit


    beforeEach(() => {
        mockSubmit = jest.fn();

        const testPage = {
            title: 'test',
            body: 'body test'
        }


        wrapper = mount(
            <PageForm page={testPage} onSubmit={mockSubmit}/>
        )
    })

    test('should call submit callback after submit form', async () => {
        const title = wrapper.find("input[name='title']")
        const button = wrapper.find("button[type='submit']")


        await act(async () => {
            title.instance().value = "new one";
            button.simulate('submit')
        })

        expect(mockSubmit.mock.calls).toEqual([
            [{
                "body": "<p>body test</p>",
                "title": 'new one'
            }]
        ]);
    })
})


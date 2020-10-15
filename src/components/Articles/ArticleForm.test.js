import * as React from 'react';
import {mount} from 'enzyme';
import ArticleForm from "./ArticleForm";
import {act} from "react-dom/test-utils";

describe('Article form test', () => {
    let wrapper
    let mockSubmit


    beforeEach(async () => {
        mockSubmit = jest.fn();

        const testArticle = {
            body: 'body test',
            short: 'short',
        }

        await act(async () => {
            wrapper = mount(
                <ArticleForm article={testArticle} onSubmit={mockSubmit}/>
            )
        })
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
                "image": [],
                "published": true,
                "short": "<p>short</p>",
                "title": 'new one'
            }]
        ]);
    })
})


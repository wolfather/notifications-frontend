import React from "react"
import { cleanup, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { CCharscount } from '../../../src/components/CCharscount'

describe('CCharscount Component', () => {
    afterEach(cleanup)
    it('should be in the document', () => {
        const stub_limit = 2;

        const { getByText } = render(
            <CCharscount 
                limit={stub_limit}
                minCharsAcceptable={10} 
                message='' />
        );

        const element = getByText(/remaining/i);
        expect(element).toBeInTheDocument()
    })

    it('should assert the text color should be red, when message prop had "minCharsAcceptable" ou less chars', () => {
        let stub_message = '';
        const stub_limit = 20;

        const { getByText } = render(
            <CCharscount 
                limit={stub_limit} 
                minCharsAcceptable={10}
                message={stub_message} />
        );

        const element = getByText(/remaining/i);
        expect(element).toHaveStyle({'color': 'rgb(220, 38, 38)'})
    })
    it('should assert the text color should be green, when message prop had more than "minCharsAcceptable" chars, and the text should be XX chars remaining', () => {
        let stub_message = 'some message';
        const stub_limit = 20;

        const { getByText } = render(
            <CCharscount 
                limit={stub_limit} 
                minCharsAcceptable={10}
                message={stub_message} />
        );

        const element = getByText(/remaining/i);
        expect(element).toHaveTextContent('8 chars remaining');
        expect(element).toHaveStyle({'color': 'rgb(101, 163, 13)'});
    });

    it('should assert the class assigned', () => {
        const stub_message = 'some message';
        const stub_limit = 20;

        const { getByText } = render(
            <CCharscount 
                limit={stub_limit} 
                minCharsAcceptable={10}
                message='' />
        );

        const element = getByText(/remaining/i);

        expect(element).toHaveClass('float-right text-xs')
    });

    it('should assert the text should be 01 char remaining', () => {
        let stub_message = 'some message complete';
        const stub_limit = 20;

        const { getByText } = render(
            <CCharscount 
                limit={stub_limit} 
                minCharsAcceptable={10}
                message={stub_message} />
        );

        const element = getByText(/remaining/i);
        expect(element).toHaveTextContent('1 char remaining');
    });
})
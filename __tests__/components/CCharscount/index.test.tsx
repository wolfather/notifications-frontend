import React from "react"
import { Providers } from '../../../src/providers'
import { render, screen } from "@testing-library/react"

import { CCharscount } from '../../../src/components/CCharscount'
// import { COLORS } from "../../../src/tokens/colors"

describe('CCharscount Component', () => {
    it('should assert initial value', () => {
        const stub_message = 'some message';
        const stub_limit = 20;

        const { getByRole } = render(
            <Providers>
                <CCharscount limit={stub_limit} message='' />
            </Providers>
        );

        const element = getByRole('tooltip');

        expect(element).toHaveStyle({'color': '#dc2626'})
    })

    it('should assert style color inline', () => {
        const stub_message = 'some message';
        const stub_limit = 20;

        const {findByText} = render(<CCharscount limit={stub_limit} message='' />);

        const element = findByText(/remain/i);

        expect(element).toHaveClass('float-right text-xs')
    })
})
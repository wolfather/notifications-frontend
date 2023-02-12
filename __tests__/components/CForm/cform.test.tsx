import React from "react"
import { cleanup, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { CForm } from '../../../src/components/CForm';
import { Providers } from '../../../src/providers'

describe('CForm Component', () => {
    afterEach(cleanup)

    test('Should have all fields empty on init', () => {
        const { getByRole } = render(
            <Providers>
                <CForm />
            </Providers>
        )

        const formElement = getByRole('form')

        expect(formElement).toBeInTheDocument()
    });



})
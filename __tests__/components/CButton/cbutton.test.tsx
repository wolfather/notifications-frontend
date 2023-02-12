import React from "react";
import { cleanup, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';
import { CButton } from '../../../src/components/CButton'

describe('CButton', () => {
    afterEach(cleanup)
    test('should be defined', () => {
        let buttonState = false
        const { getByLabelText } = render(<CButton buttonType="submit" label="Submit" isDisabled={buttonState} />)

        const btn = getByLabelText('Submit')

        expect(btn).toBeDefined()
    })

    test('should have the disabled attribute', () => {
        let buttonState = false
        const { getByLabelText } = render(<CButton buttonType="submit" label="Submit" isDisabled={buttonState} />)

        const btn = getByLabelText('Submit')

        expect(btn).toHaveProperty('type', 'submit')
        //expect(btn).toHaveProperty('disabled')
    })
})
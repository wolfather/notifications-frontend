import React from "react";
import { render, screen, waitFor } from "@testing-library/react"
import { CButton } from '../../../src/components/CButton'

describe('CButton', () => {
    test('should be defined', () => {
        let buttonState = false
        const { getByRole, getByLabelText } = render(<CButton buttonType="submit" label="Submit" isDisabled={buttonState} />)

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

    // test('should not have the disabled property', () => {
    //     let buttonState = true
    //     const { getByLabelText } = render(<CButton buttonType="submit" label="Submit" isDisabled={buttonState} />)

    //     const btn = getByLabelText('Submit')

    //     expect(btn).not.toHaveAttribute('disabled')
    // })
})
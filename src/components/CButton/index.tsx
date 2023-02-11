import { FC, HTMLInputTypeAttribute } from "react"

type props = React.InputHTMLAttributes<HTMLInputElement> & {
    isDisabled: boolean
    label: string
    buttonType: 'submit'|'alert'|'warning'
}

export const CButton: FC<props> = ({isDisabled, label, buttonType, ...rest}: props) => {
    const disabledColorToken = 'gray';
    const submitEnabledToken = 'green';
    const btnSubmitStyle = `disabled:bg-${disabledColorToken}-400 disabled:hover:bg-${disabledColorToken}-400  disabled:hover:border-transparent disabled:focus:outline-none disabled:focus:ring-2 disabled:focus:ring-${submitEnabledToken}-600 disabled:focus:ring-offset-2 disabled:text-white disabled:focus:ring-${submitEnabledToken}-100 disabled:focus:outline-none disabled:border-${disabledColorToken}-800 disabled:hover:border-${disabledColorToken}-800 focus:ring-0 bg-${submitEnabledToken}-600 font-semibold rounded border border-${submitEnabledToken}-800 px-4 py-1 text-${submitEnabledToken}-200 w-2/4 text-sm hover:border-transparent focus:outline-none focus:ring-2 focus:ring-${submitEnabledToken}-600 focus:ring-offset-2`;

    return (
        <input {...rest}
            type="submit" 
            value={label}
            aria-label={label} 
            className={btnSubmitStyle}
            disabled={isDisabled} />
    )
}
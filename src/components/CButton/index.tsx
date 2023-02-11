import { FC, HTMLInputTypeAttribute } from "react"

type props = React.InputHTMLAttributes<HTMLInputElement> & {
    isDisabled: boolean
    label: string
}

export const CButton: FC<props> = ({isDisabled, label, ...rest}: props) => {

    return (
        <input {...rest}
            type="submit" 
            value={label}
            aria-label={label} 
            disabled={isDisabled} />
    )
}
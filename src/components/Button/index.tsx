import { FC, HTMLInputTypeAttribute } from "react"

type props = React.InputHTMLAttributes<HTMLInputElement> & {
    isDisabled: boolean
}

export const CButton: FC<props> = ({isDisabled, ...rest}: props) => {

    return (
        <input {...rest}
            type="submit" 
            value="Submit" 
            disabled={isDisabled} />
    )
}
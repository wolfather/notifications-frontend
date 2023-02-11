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
            className="self-center w-3/4 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            disabled={isDisabled} />
    )
}
import { FC, HTMLInputTypeAttribute } from "react"
import { styles } from "./styles"

type props = React.InputHTMLAttributes<HTMLInputElement> & {
    isDisabled: boolean
    label: string
    buttonType: 'submit'|'alert'|'warning'|'link'
}

export const CButton: FC<props> = ({isDisabled, label, buttonType, ...rest}: props) => {
    

    return (
        <input {...rest}
            type="submit" 
            value={label}
            aria-label={label} 
            className={styles.btnSubmitStyle}
            disabled={isDisabled} />
    )
}
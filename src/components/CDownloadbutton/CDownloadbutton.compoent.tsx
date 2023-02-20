import { AnchorHTMLAttributes, FC } from "react"
import { styles } from "./styles";

type props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    url: string;
    fileName: string;
}

export const CDownloadButtonComponent: FC<props> = ({url, fileName, ...rest}: props) => {

    return (
        <a 
            {...rest}
            role='button' 
            className={styles.linkButton}
            href={url} 
            download={fileName}>download log</a>
    )
}
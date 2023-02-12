import { FC, memo, TextareaHTMLAttributes } from "react";
import { CCharscount } from "../CCharscount";
import { styles } from "./styles";

type props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    charLimit: number;
    textareaMessage: string;
    setTextareaMessage: Function;
}

const _CTextarea: FC<props> = ({
    charLimit, 
    textareaMessage, 
    setTextareaMessage, 
    ...rest
}: props) => {

    return (
        <div className={styles.container}>
            <textarea {...rest}
                className={styles.textarea}
                maxLength={charLimit}
                value={textareaMessage} 
                onChange={(e) => setTextareaMessage(e.target.value)}>
            </textarea>

            <div>
                <CCharscount 
                    limit={charLimit} 
                    minCharsAcceptable={10}
                    message={textareaMessage} />
            </div>
        </div>
    )
}

export const CTextarea = memo(_CTextarea)
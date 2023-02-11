import { FC, memo, TextareaHTMLAttributes } from "react";
import { CCharscount } from "../CCharscount";

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
        <div className="container">
            <textarea {...rest}
                maxLength={charLimit}
                value={textareaMessage} 
                onChange={(e) => setTextareaMessage(e.target.value)}>
            </textarea>

            <div>
                <CCharscount 
                    limit={charLimit} 
                    message={textareaMessage} />
            </div>
        </div>
    )
}

export const CTextarea = memo(_CTextarea)
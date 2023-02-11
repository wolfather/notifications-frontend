import { FC, TextareaHTMLAttributes, useMemo } from "react";

type props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    charLimit: number;
    textareaMessage: string;
    setTextareaMessage: Function;
}

export const CTextarea: FC<props> = ({
    charLimit, 
    textareaMessage, 
    setTextareaMessage, 
    ...rest
}: props) => {

    const charsRemains = useMemo(() => {
        return charLimit - textareaMessage.length
    }, [textareaMessage])

    return (<>
        <textarea {...rest}
            maxLength={charLimit}
            value={textareaMessage} 
            onChange={(e) => setTextareaMessage(e.target.value)} />

        <div>
            <small>{charsRemains} chars remains</small>
        </div>
    </>)
}
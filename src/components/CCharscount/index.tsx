import { FC, HTMLAttributes, useMemo, useState } from "react";
import { COLORS } from "../../tokens/colors";

type props = HTMLAttributes<HTMLElement> & {
    limit: number;
    message: string
}

export const CCharscount: FC<props> = ({limit, message, ...rest}: props) => {

    const [textStyle, setStyleColor] = useState<string>('');

    const charsRemains = useMemo(() => {
        const charsCalc = limit - message.length;

        setStyleColor(message.length < 10 ? COLORS.danger : COLORS.ok);
        
        return charsCalc > 1 ? 
            `${charsCalc} chars remains` : 
            `${charsCalc} char remain`;
    }, [message]);

    return (
        <small
            role='tooltip'
            {...rest}
            style={{color: textStyle}} 
            className='float-right text-xs'>{charsRemains}</small>
    );
}
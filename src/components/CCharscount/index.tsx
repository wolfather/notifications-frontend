import { FC, HTMLAttributes, useMemo, useState } from "react";
import { COLORS } from "../../tokens/colors";
import { styles } from "./styles";

type props = HTMLAttributes<HTMLElement> & {
    limit: number;
    minCharsAcceptable: number;
    message: string;
}

export const CCharscount: FC<props> = ({limit, message, minCharsAcceptable, ...rest}: props) => {
    const [textStyle, setStyleColor] = useState<string>('');

    const charsRemains = useMemo(() => {
        const charsCalc = limit - message.length;

        setStyleColor(message.length < minCharsAcceptable ? COLORS.danger : COLORS.ok);
        
        return charsCalc > 1 ? 
            `${charsCalc} chars remaining` : 
            `${charsCalc} char remaining`;
    }, [message]);

    return (
        <small
            data-test-id="char-counter"
            {...rest}
            style={{color: textStyle}} 
            className={styles.smallComponent}>{charsRemains}</small>
    );
}
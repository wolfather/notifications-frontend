import { FC, HTMLAttributes, ReactNode } from "react";
import { COLORS } from "../../tokens/colors";

type props = HTMLAttributes<HTMLDivElement> & {
    children: JSX.Element | ReactNode | Element;
    channel: string;
}

export const BoxColor: FC<props> = ({children, channel, ...rest}: props) => {
    return (
        <div 
            style={{'background': COLORS[channel]}} 
            {...rest}>{children}
        </div>
    )
} 
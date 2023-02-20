import { FC, HTMLAttributes, ReactNode } from "react";
import { COLORS } from "../../tokens/colors";

type props = HTMLAttributes<HTMLDivElement> & {
    children: JSX.Element | ReactNode | Element;
}

export const BoxColor: FC<props> = ({children, ...rest}: props) => {
    // style={{'background': COLORS[channel]}}
    return (
        <div {...rest}>{children}</div>
    )
} 
import { FC, HTMLAttributes, ReactNode } from "react";

type props = HTMLAttributes<HTMLDivElement> & {
    children: JSX.Element | ReactNode | Element;
    channel: string;
}

export const BoxColor: FC<props> = ({children, channel, ...rest}: props) => {
    const color: any = {
        push_notification : '#0891b2', 
        email: '#fef08a', 
        sms: '#fda4af'
    };

    return (
        <div 
            style={{'background': color[channel]}} 
            {...rest}>{children}
        </div>
    )
} 
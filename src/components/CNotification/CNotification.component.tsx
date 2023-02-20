import { FC, ReactNode } from 'react';
import { BoxColor } from "../CBoxColor";
import { styles } from "./styles";

type NotificationBaseProps = {
    children: ReactNode;
}


type NotificationProps = {
    data: any;
}

const CNotificationBase: FC<NotificationBaseProps> = ({children}: NotificationBaseProps) => {
    return (
        <BoxColor 
            className={styles.colorBox}>
            <div aria-label='close'>x</div>
            {children}
        </BoxColor>
    )
};

export const CNotification: FC<NotificationProps> = ({data}: NotificationProps) => {
    
    const notificationHeader = (param: any) => {
        if(param.type === 'sms') {
            return <h4 className={styles.title}>{param.phone}</h4>
        } else if(param.type === 'email') {
            return <h4 className={styles.title}>Hey, {param.name}! you have a new email</h4>
        }
    };
    const notificationBody = (param: any) => {
        if(param.type === 'sms') {
            return <pre className={styles.message}>{`Hi! The ${param?.phone} are
            receiving this SMS because 
            you've subscribed
            at ${param.category}!`}</pre>
        } else if(param.type === 'email') {
            return <div>
                <p>you have a new email from notifications</p>
                <p>You subscribed at {param.category}</p>
            </div>
        }
    };

    return (
        <CNotificationBase>
            <div>
                {notificationHeader(data.type)}
                {notificationBody(data.type)}
            </div>
        </CNotificationBase>
    )
};


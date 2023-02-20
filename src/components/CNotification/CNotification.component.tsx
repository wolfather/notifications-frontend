import { FC, ReactNode } from 'react';
import { BoxColor } from "../CBoxColor";
import { styles } from "./styles";

type NotificationBaseProps = {
    children: ReactNode;
}

type NotificationProps = {
    data: {
        type: string;
        category: string;
        userId: string;
        name: string;
        email?: string;
        phone?: string;
    };
}

const CNotificationBase: FC<NotificationBaseProps> = ({children}: NotificationBaseProps) => {
    return (
        <BoxColor 
            role='dialog'
            className={styles.colorBox}>
            {children}
        </BoxColor>
    )
};

export const CNotification: FC<NotificationProps> = ({data}: NotificationProps) => {
    if(data.type === 'sms') {
        return <CNotificationBase>
            <div className='p-3 rounded shadow-lg opacity-75 bg-orange-400 text-black'>
                <h4 className={styles.title}>Notification</h4>
                <p className={styles.message}>{`Hi! The ${data?.phone} are receiving this SMS because you've subscribed at ${data.category}!`}</p>
            </div>
        </CNotificationBase>
    } else if(data.type === 'email') {
        return <CNotificationBase>
            <div className='p-3 rounded shadow-lg opacity-75 bg-lime-500 text-black'>
                <h4 className={styles.title}>Hey, {data.name}! you have a new email</h4>
                <p>You have a new email from notifications</p>
                <p>You subscribed at {data.category}</p>
            </div>
        </CNotificationBase>
    } else if(data.type === 'push') {
        return <CNotificationBase>
            <div className='p-3 rounded shadow-lg opacity-75 bg-yellow-200 text-black'>
            <h4 className={styles.title}>Hey, {data.name}! We have great news!</h4>
                <p>You've subscribed at {data.category}! Check it out.</p>
            </div>
        </CNotificationBase>
    }
    return <div>error...</div>
};


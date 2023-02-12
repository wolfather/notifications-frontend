import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { NotificationEntity } from "../../entity/notification.entity";
import { NOTIFICATIONS } from '../../enum/notifications';
import { BoxColor } from "../CBoxColor";
import { styles } from "./styles";

export type NotificationContextProps = {
    notify: boolean;
    setNotify: Dispatch<SetStateAction<boolean>>;
    notificationData: NotificationEntity;
    setNotificationData: Dispatch<SetStateAction<NotificationEntity>>;
}

export const NotificationContext = createContext<NotificationContextProps>({
    notify: false,
    setNotify: () => {},
    notificationData: {
        channel: '',
        subscription: '',
        user: {}
    },
    setNotificationData: () => {}
});

export const NotificationProvider = ({children}: any) => {
    const [notificationData, setNotificationData] = useState<NotificationEntity>({} as NotificationEntity);
    const [notify, setNotify] = useState<boolean>(false);
    const DURATION = 2000;

    useEffect(() => {
        if(notify) {
            const notifyTimer = setTimeout(() => {
                setNotificationData({} as NotificationEntity);
                setNotify(false);
            }, DURATION);

            return () => clearTimeout(notifyTimer);
        }
    }, [notify])

    return <NotificationContext.Provider value={{notify, setNotify, notificationData, setNotificationData}}>
        <div>
            {notify ? <CNotification 
                channel={notificationData.channel}
                subscription={notificationData.subscription}
                user={notificationData.user} /> : <></>}
            {children}
        </div>
    </NotificationContext.Provider>
}

export const CNotification: FC<NotificationEntity> = ({channel, subscription, user}: NotificationEntity) => {
    const title = NOTIFICATIONS.find(n => n.value === subscription);
    
    return (
        <BoxColor 
            channel={channel} 
            className={styles.colorBox}>
            <div aria-label='close'>x</div>
            <h4 className={styles.title}>{title?.label}</h4>
            <h5 className={styles.message}>{`Hey ${user?.name}, you've subscribed at ${channel}!`}</h5>
        </BoxColor>
    )
}
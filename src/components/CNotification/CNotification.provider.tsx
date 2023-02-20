import { Dispatch, SetStateAction, createContext, useState, useEffect, ReactNode, lazy, Suspense } from "react";
import { NotificationEntity } from "../../entity/notification.entity";
import { CNotification } from "./CNotification.component";


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
        category: '',
        user: {}
    },
    setNotificationData: () => {}
});

export const NotificationProvider = () => {
    const [notificationData, setNotificationData] = useState<NotificationEntity>({} as NotificationEntity);
    const [notify, setNotify] = useState<boolean>(false);
    const DURATION = 14000;
    const [notificationUI, setNotificationUI] = useState<any[]>([]);

    useEffect(() => {
        //setNotificationUI([])
        if(notify) {
            const worker = new Worker('../../service.worker.js');
            
            [
                {type: 'sms'},
                {type: 'email'},
                {type: 'push'},
            ].forEach(notification => {
                worker.postMessage({
                    ...notification,
                    data: notificationData
                });
            });

            worker.onmessage = function(e) {
                const { data } = e;
                setNotificationUI(prev => [...prev, data]);
            };

            const notifyTimer = setTimeout(() => {
                setNotificationData({} as NotificationEntity);
                setNotify(false);
            }, Math.round(DURATION * Math.random()));

            return () => {
                clearTimeout(notifyTimer);
                setNotificationUI([]);
            };
        }
    }, [notify])

    return <NotificationContext.Provider value={{
        notify, setNotify, notificationData, setNotificationData
    }}>
        <div>
            {
            notify && notificationUI.length ? 
            notificationUI.map((notification, index) => (
                <CNotification 
                    key={index}
                    data={notification} />
            ))
             : <></>}
        </div>
    </NotificationContext.Provider>
}


import { useCallback, useContext } from "react";
import { NotificationContext, NotificationContextProps } from "../components/CNotification";
import { LogFactory } from "../factory/log.factory";
import { AppLoggerContext, LoggerContextProp } from "../providers/applogger.provider";
import { UserContext, UserContextProp } from "../providers/user.provider";

type props = {
    notificationValue: string;
    categoryValue: string;
    message: string;
}

export const useSubmit = ({notificationValue, categoryValue, message}: props) => {
    const { userSelected, setUserSelected } = useContext<UserContextProp>(UserContext);
    const { setLogs } = useContext<LoggerContextProp>(AppLoggerContext);
    const { setNotify, setNotificationData } = useContext<NotificationContextProps>(NotificationContext)
    
    const onSubmitForm = useCallback(() => {
        const _channels = new Set(userSelected.channels).add(notificationValue)
        const _subscribed = new Set(userSelected.subscribed).add(categoryValue)

        setUserSelected(prev => ({
            ...prev, 
            channels : Array.from(_channels),
            subscribed: Array.from(_subscribed)
        }));
        
        const userLogData = LogFactory(
            userSelected, 
            notificationValue, 
            categoryValue,
            message
        );

        setLogs(prev => [...prev, userLogData]);

        setNotificationData({
            channel: notificationValue,
            subscription: categoryValue,
            user: userSelected
        });

        setNotify(true);

        console.log('called!')
        setUserSelected({});

    }, [userSelected, notificationValue, categoryValue, message]);

    return {
        userSelected,
        onSubmitForm
    }
}
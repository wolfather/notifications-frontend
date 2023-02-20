import { useCallback, useContext } from "react";
import { NotificationContext, NotificationContextProps } from "../components/CNotification";
import { userLogFactory } from "../factory/userlog.factory";
import { AppLoggerContext, LoggerContextProp } from "../providers/applogger.provider";
import { UserContext, UserContextProp } from "../providers/user.provider";

type props = {
    categoryValue: string;
    message: string;
}

export const useSubmit = ({categoryValue, message}: props) => {
    const { userSelected, setUserSelected } = useContext<UserContextProp>(UserContext);
    const { setLogs } = useContext<LoggerContextProp>(AppLoggerContext);
    const { setNotify, setNotificationData } = useContext<NotificationContextProps>(NotificationContext);
    
    const onSubmitForm = useCallback(() => {
        const _subscribed = new Set(userSelected.subscribed).add(categoryValue);

        setUserSelected(prev => ({
            ...prev, 
            subscribed: Array.from(_subscribed)
        }));
        
        const userLogData = userLogFactory(
            userSelected, 
            categoryValue,
            message
        );

        setLogs(prev => [...prev, userLogData]);
        

        setNotificationData({
            category: categoryValue,
            user: userSelected
        });

        setNotify(true);

        setUserSelected({});


    }, [userSelected, categoryValue, message]);

    return {
        userSelected,
        onSubmitForm
    }
}
